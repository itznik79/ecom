import nodemailer, { Transporter } from 'nodemailer';
import 'dotenv/config';

class MailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: false, // true only for 465
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  async verifyConnection() {
    try {
      await this.transporter.verify();
      console.log('Mail server connected successfully');
    } catch (error) {
      console.error('Mail server connection failed', error);
      process.exit(1);
    }
  }

  async sendMail(
    to: string,
    subject: string,
    html: string,
  ): Promise<void> {
    await this.transporter.sendMail({
      from: process.env.MAIL_FROM,
      to,
      subject,
      html,
    });
  }
}

export const mailService = new MailService();
