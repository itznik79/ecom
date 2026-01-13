// auth/auth.service.ts

import { Injectable, BadRequestException } from "@nestjs/common";
import { OtpService, OtpPurpose } from "../../infrastructure/services/otp.service";
import { MailService } from "../../infrastructure/services/mail.service";
import { PasswordService } from "../../infrastructure/services/password.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly otpService: OtpService,
    private readonly mailService: MailService,
    private readonly passwordService: PasswordService,
  ) {}

  async sendOtp(email: string, purpose: OtpPurpose) {
    if (!email) {
      throw new BadRequestException("Email is required");
    }

    const { otp, expiresIn } =
      await this.otpService.generateAndStore(purpose, email);

    await this.mailService.sendOtpMail(email, otp, purpose);

    return {
      message: "OTP sent successfully",
      expiresIn,
    };
  }

  async verifyOtp(
    email: string,
    otp: string,
    purpose: OtpPurpose,
  ) {
    if (!email || !otp) {
      throw new BadRequestException("Email and OTP are required");
    }

    await this.otpService.verify(purpose, email, otp);

    return {
      message: "OTP verified successfully",
    };
  }

  async forgotPassword(email: string) {
  if (!email) {
    throw new BadRequestException("Email is required");
  }

  const { otp, expiresIn } =
    await this.otpService.generateAndStore("reset_password", email);

  await this.mailService.sendOtpMail(email, otp, "reset_password");

  return {
    message: "Password reset OTP sent",
    expiresIn,
  };
}

async verifyForgotOtp(email: string, otp: string) {
  if (!email || !otp) {
    throw new BadRequestException("Email and OTP are required");
  }

  await this.otpService.verify("reset_password", email, otp);

  await this.otpService.allowPasswordReset(email);

  return {
    message: "OTP verified. You can reset password now",
  };
}

async resetPassword(email: string, newPassword: string) {
  if (!email || !newPassword) {
    throw new BadRequestException("Invalid request");
  }

  const allowed =
    await this.otpService.isPasswordResetAllowed(email);

  if (!allowed) {
    throw new BadRequestException("Reset password not allowed");
  }

  const hashedPassword =
    await this.passwordService.hashPassword(newPassword);

  // 👉 YAHAN TUM DB UPDATE KAROGE
  // user.password = hash(newPassword)
  // save user

  await this.otpService.clearPasswordReset(email);

  return {
    message: "Password reset successfully",
  };
}

}


/* For Login 
const isMatch = await passwordService.comparePassword(
  inputPassword,
  user.password,
);

if (!isMatch) {
  throw new BadRequestException("Invalid credentials");
}
*/