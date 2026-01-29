import { Controller, Post, Body, UseGuards, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { SendOtpDto } from './dto/send-otp.dto';
import { JoiValidationPipe } from '../../common/pipes/joi-validation.pipe';
import { registerSchema } from './validators/register.schema';
import { loginSchema } from './validators/login.schema';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { forgotPasswordSchema } from './validators/forgot-password.schema';
import { resetPasswordSchema } from './validators/reset-password.schema';
import { changePasswordSchema } from './validators/change-password.schema';
import { refreshTokenSchema } from './validators/refresh-token.schema';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { MESSAGES } from '../../common/constants/messages.constants';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register/send-otp')
  async sendOtp(@Body() dto: SendOtpDto) {
    await this.authService.sendRegisterOtp(dto.email);
    return { message: MESSAGES.AUTH.OTP_SENT };
  }

  @Post('register')
  async register(
    @Body(new JoiValidationPipe(registerSchema)) body: any,
  ) {
    return this.authService.register(body);
  }

  @Post('login')
  async login(
    @Body(new JoiValidationPipe(loginSchema)) body: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.authService.login(body);

    res.cookie('access_token', tokens.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return tokens;
  }

  @Post('forgot-password')
  async forgotPassword(@Body(new JoiValidationPipe(forgotPasswordSchema)) dto: ForgotPasswordDto) {
    return this.authService.sendForgotPasswordOtp(dto);
  }

  @Post('reset-password')
  async resetPassword(@Body(new JoiValidationPipe(resetPasswordSchema)) dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }

  @Post('refresh')
  async refresh(
    @Body(new JoiValidationPipe(refreshTokenSchema)) dto: RefreshTokenDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.authService.refreshToken(dto);

    res.cookie('access_token', tokens.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return tokens;
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() req) {
    return this.authService.logout(req.user.sub, req.user.jti);
  }

  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  async changePassword(@Req() req, @Body(new JoiValidationPipe(changePasswordSchema)) dto: ChangePasswordDto) {
    return this.authService.changePassword(req.user.sub, dto);
  }
}
