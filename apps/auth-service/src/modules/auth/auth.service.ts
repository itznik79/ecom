import { Injectable, BadRequestException } from '@nestjs/common';
import { UserCredential } from '../../infrastructure/database/models/user-credential-model';
import { comparePassword, hashPassword } from '../../common/utils/hash.util';
import { verifyRegisterOtp } from './services/otp-verify.service';
import { sendRegisterOtp } from './services/otp.service';
import { generateAccessToken, generateRefreshToken } from '../../common/utils/jwt.util';
import { saveRefreshToken } from './services/refresh-token.service';
import { randomUUID } from 'crypto';
import { storeAccessToken } from '../../common/utils/access-token-redis.util';

@Injectable()
export class AuthService {
  async sendRegisterOtp(email: string) {
    const exists = await UserCredential.findOne({ where: { email } });
    if (exists) {
      throw new BadRequestException('User already exists');
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
    throw new BadRequestException('Invalid or expired OTP');
  }

  const existingUser = await UserCredential.findOne({ where: { email } });
  if (existingUser) {
    throw new BadRequestException('User already exists');
  }

  const passwordHash = await hashPassword(password);

  const user = await UserCredential.create({
    email,
    password_hash: passwordHash,
    provider: 'local',
    is_active: true,
  });

  // Later this goes to user-service
  // but for now you can log or emit event
  console.log({
    user_id: user.user_id,
    first_name,
    last_name,
    phone,
    marketing_opt_in,
  });

  return {
    message: 'Registration successful',
    user_id: user.user_id,
    email: user.email,
  };
};

async login(payload: any) {
  const { email, password } = payload;

  const user = await UserCredential.findOne({ where: { email } });
  if (!user || !user.password_hash) {
    throw new BadRequestException('Invalid credentials');
  }

  const isPasswordValid = await comparePassword(
    password,
    user.password_hash,
  );

  if (!isPasswordValid) {
    throw new BadRequestException('Invalid credentials');
  }

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

