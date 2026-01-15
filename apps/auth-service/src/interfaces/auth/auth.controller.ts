import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from '../../modules/auth/auth.service';

@Controller('auth') // <-- important
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('send-otp')
  async sendOtp(
    @Body() body: { email: string; purpose: 'reset_password' | 'signup' },
  ) {
    try {
      const { email, purpose } = body;

      const result =
        purpose === 'reset_password'
          ? await this.authService.sendResetPasswordOtp(email)
          : await this.authService.sendSignupOtp(email);

      return { success: true, data: result };
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('verify-otp')
  async verifyOtp(
    @Body() body: { email: string; otp: string; purpose: 'reset_password' | 'signup' },
  ) {
    try {
      const { email, otp, purpose } = body;

      if (purpose === 'reset_password') {
        await this.authService.verifyResetPasswordOtp(email, otp);
      } else {
        await this.authService.verifySignupOtp(email, otp);
      }

      return { success: true };
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('register')
  async register(
    @Body() body: { email: string; password: string },
  ) {
    try {
      const { email, password } = body;
      const result = await this.authService.register(email, password);
      return { success: true, data: result };
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}