import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

  async sendSignupOtp(email: string) {
    // send OTP logic
  }

  async sendResetPasswordOtp(email: string) {
    // send OTP logic
  }

  async verifySignupOtp(email: string, otp: string) {
    // verify logic
  }

  async verifyResetPasswordOtp(email: string, otp: string) {
    // verify logic
  }

  async register(email: string, password: string) {
    // your DB logic here
    return { user_id: 'generated-uuid-here' };
  }
}