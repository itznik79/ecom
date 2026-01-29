import nodemailer, { Transporter } from 'nodemailer';
import 'dotenv/config';
import { Logger } from '@nestjs/common';

class MailService {
  private transporter: Transporter;
  private readonly logger = new Logger(MailService.name);

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: false, // true only for 465
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      logger: true, // Enable nodemailer internal logging
      debug: false,
    });
  }

  async verifyConnection() {
    try {
      await this.transporter.verify();
      this.logger.log('Mail server connected successfully');
    } catch (error) {
      this.logger.error('Mail server connection failed', error);
      process.exit(1);
    }
  }

  async sendMail(
    to: string,
    subject: string,
    html: string,
  ): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: process.env.MAIL_FROM,
        to,
        subject,
        html,
      });
      this.logger.log(`Email sent to ${to}: ${subject}`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${to}`, error);
      throw error;
    }
  }
}

export const mailService = new MailService();
