import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { OtpService } from "../../infrastructure/services/otp.service";
import { MailService } from "../../infrastructure/services/mail.service";
import { PasswordService } from "../../infrastructure/services/password.service";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({}),
  ],
  controllers: [AuthController], // 🔴 must
  providers: [
    AuthService,
    OtpService,
    MailService,
    PasswordService,
  ],
})
export class AuthModule { }
