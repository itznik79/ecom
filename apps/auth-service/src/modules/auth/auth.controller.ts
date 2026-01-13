// auth/auth.controller.ts

import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { OtpPurpose } from "../../infrastructure/services/otp.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("send-otp")
  sendOtp(
    @Body("email") email: string,
    @Body("purpose") purpose: OtpPurpose,
  ) {
    return this.authService.sendOtp(email, purpose);
  }

  @Post("verify-otp")
  verifyOtp(
    @Body("email") email: string,
    @Body("otp") otp: string,
    @Body("purpose") purpose: OtpPurpose,
  ) {
    return this.authService.verifyOtp(email, otp, purpose);
  }

  @Post("forgot-password")
forgotPassword(@Body("email") email: string) {
  return this.authService.forgotPassword(email);
}

@Post("verify-forgot-otp")
verifyForgotOtp(
  @Body("email") email: string,
  @Body("otp") otp: string,
) {
  return this.authService.verifyForgotOtp(email, otp);
}

@Post("reset-password")
resetPassword(
  @Body("email") email: string,
  @Body("newPassword") newPassword: string,
) {
  return this.authService.resetPassword(email, newPassword);
}


}
