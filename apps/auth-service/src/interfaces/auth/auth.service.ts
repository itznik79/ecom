import { OtpService } from "../../infrastructure/services/otp.service";
import { MailService } from "../../infrastructure/services/mail.service";

const otpService = new OtpService();
const mailService = new MailService();

export class AuthService {
  async sendSignupOtp(email: string) {
    const { otp, expiresIn } =
      await otpService.generateAndStore("signup", email);

    await mailService.sendOtpMail(email, otp, "signup");

    return { expiresIn };
  }

  async verifySignupOtp(email: string, otp: string) {
    return otpService.verify("signup", email, otp);
  }

  async sendResetPasswordOtp(email: string) {
    const { otp, expiresIn } =
      await otpService.generateAndStore("reset_password", email);

    await mailService.sendOtpMail(
      email,
      otp,
      "reset_password"
    );

    return { expiresIn };
  }

  async verifyResetPasswordOtp(email: string, otp: string) {
    return otpService.verify("reset_password", email, otp);
  }
}
