import { mailTransporter } from "../../config/mail.config";

export class MailService {
  async sendOtpMail(
    to: string,
    otp: string,
    purpose: string
  ) {
    const subject =
      purpose === "reset_password"
        ? "Reset Password OTP"
        : "Your OTP Code";

    const html = `
      <div>
        <h2>${subject}</h2>
        <p>Your OTP is:</p>
        <h1>${otp}</h1>
        <p>This OTP is valid for 5 minutes.</p>
      </div>
    `;

    await mailTransporter.sendMail({
      from: process.env.MAIL_FROM,
      to,
      subject,
      html,
    });
  }
}
