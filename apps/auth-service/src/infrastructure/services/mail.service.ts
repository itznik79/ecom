// infrastructure/services/mail.service.ts

import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";
import { OtpPurpose } from "./otp.service";

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  async sendOtpMail(
    to: string,
    otp: string,
    purpose: OtpPurpose,
  ) {
    let subject = "Your OTP";
    let text = `Your OTP is ${otp}. It is valid for 5 minutes.`;

    if (purpose === "signup") {
      subject = "Verify your account";
    }

    if (purpose === "reset_password") {
      subject = "Reset your password";
    }

    await this.transporter.sendMail({
      from: process.env.MAIL_FROM,
      to,
      subject,
      text,
    });
  }
}
