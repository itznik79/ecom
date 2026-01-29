import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  HttpStatus,
  HttpException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { UserCredential } from '../../infrastructure/database/models/user-credential-model';
import { comparePassword, hashPassword } from '../../common/utils/hash.util';
import { verifyRegisterOtp, verifyForgotPasswordOtp } from './services/otp-verify.service';
import { sendRegisterOtp, sendForgotPasswordOtp } from './services/otp.service';
import { generateAccessToken, generateRefreshToken } from '../../common/utils/jwt.util';
import { saveRefreshToken, validateRefreshToken, revokeRefreshToken, revokeAllRefreshTokens } from './services/refresh-token.service';
import { randomUUID } from 'crypto';
import { storeAccessToken, revokeAccessToken } from '../../common/utils/access-token-redis.util';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../../common/config/jwt.config';
import { MESSAGES } from '../../common/constants/messages.constants';

@Injectable()
export class AuthService {
  async sendRegisterOtp(email: string) {
    const exists = await UserCredential.findOne({ where: { email } });
    if (exists) {
      throw new HttpException(MESSAGES.AUTH.USER_EXISTS, HttpStatus.CONFLICT);
    }

    await sendRegisterOtp(email);
  }

  async register(payload: any) {
    const {
      email,
      password,
      first_name,
      last_name,
      phone,
      otp,
      marketing_opt_in,
    } = payload;

    const isOtpValid = await verifyRegisterOtp(email, otp);
    if (!isOtpValid) {
      throw new BadRequestException(MESSAGES.AUTH.INVALID_OTP);
    }

    const existingUser = await UserCredential.findOne({ where: { email } });
    if (existingUser) {
      throw new HttpException(MESSAGES.AUTH.USER_EXISTS, HttpStatus.CONFLICT);
    }

    const passwordHash = await hashPassword(password);

    const user = await UserCredential.create({
      email,
      password_hash: passwordHash,
      provider: 'local',
      is_active: true,
    });

    return {
      message: MESSAGES.AUTH.REGISTER_SUCCESS,
      user_id: user.user_id,
      email: user.email,
    };
  };

  async login(payload: any) {
    const { email, password } = payload;

    const user = await UserCredential.findOne({ where: { email } });
    if (!user || !user.password_hash) {
      throw new UnauthorizedException(MESSAGES.AUTH.INVALID_CREDENTIALS);
    }

    const isPasswordValid = await comparePassword(
      password,
      user.password_hash,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException(MESSAGES.AUTH.INVALID_CREDENTIALS);
    }

    return this.generateTokens(user);
  }

  async sendForgotPasswordOtp(dto: ForgotPasswordDto) {
    const user = await UserCredential.findOne({ where: { email: dto.email } });
    if (!user) {
      throw new NotFoundException(MESSAGES.AUTH.USER_NOT_FOUND);
    }
    await sendForgotPasswordOtp(dto.email);
    return { message: MESSAGES.AUTH.OTP_SENT };
  }

  async resetPassword(dto: ResetPasswordDto) {
    const isOtpValid = await verifyForgotPasswordOtp(dto.email, dto.otp);
    if (!isOtpValid) {
      throw new BadRequestException(MESSAGES.AUTH.INVALID_OTP);
    }

    const passwordHash = await hashPassword(dto.newPassword);

    // Update password and revoke all sessions
    const user = await UserCredential.findOne({ where: { email: dto.email } });
    if (!user) throw new NotFoundException(MESSAGES.AUTH.USER_NOT_FOUND);

    await user.update({ password_hash: passwordHash });

    // Initial implementation: revoke all refresh tokens for security
    await revokeAllRefreshTokens(user.user_id);

    return { message: MESSAGES.AUTH.PASSWORD_RESET_SUCCESS };
  }

  async refreshToken(dto: RefreshTokenDto) {
    try {
      const payload: any = jwt.verify(dto.refreshToken, jwtConfig.refreshToken.secret);
      const userId = payload.sub;

      const storedToken = await validateRefreshToken(userId, dto.refreshToken);
      if (!storedToken) {
        throw new ForbiddenException('Invalid refresh token');
      }

      // Rotate token: revoke old one
      await revokeRefreshToken(storedToken.id);

      const user = await UserCredential.findByPk(userId);
      if (!user) throw new ForbiddenException(MESSAGES.AUTH.USER_NOT_FOUND);

      const tokens = await this.generateTokens(user);
      return tokens;
    } catch (error) {
      throw new ForbiddenException(MESSAGES.AUTH.REFRESH_TOKEN_INVALID);
    }
  }

  async logout(userId: string, tokenId: string) {
    await revokeAccessToken(userId, tokenId);
    // Optionally revoke refresh token associated if we had that info, 
    // but for now we just revoke access token as per common stateless checks
    return { message: MESSAGES.AUTH.LOGOUT_SUCCESS };
  }

  async changePassword(userId: string, dto: ChangePasswordDto) {
    const user = await UserCredential.findByPk(userId);
    if (!user) throw new NotFoundException(MESSAGES.AUTH.USER_NOT_FOUND);

    const isMatch = await comparePassword(dto.oldPassword, user.password_hash);
    if (!isMatch) {
      throw new UnauthorizedException(MESSAGES.AUTH.INCORRECT_OLD_PASSWORD);
    }

    const newHash = await hashPassword(dto.newPassword);
    await user.update({ password_hash: newHash });

    return { message: MESSAGES.AUTH.PASSWORD_CHANGED_SUCCESS };
  }

  private async generateTokens(user: UserCredential) {
    const tokenId = randomUUID();
    const jwtPayload = {
      sub: user.user_id,
      email: user.email,
      jti: tokenId,
    };

    const accessToken = generateAccessToken(jwtPayload);
    const refreshToken = generateRefreshToken(jwtPayload);

    // access token ttl: 15 minutes
    await storeAccessToken(
      user.user_id,
      tokenId,
      15 * 60,
    );

    const refreshExpiry = new Date();
    refreshExpiry.setDate(refreshExpiry.getDate() + 7);

    await saveRefreshToken(
      user.user_id,
      refreshToken,
      refreshExpiry,
    );

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}

