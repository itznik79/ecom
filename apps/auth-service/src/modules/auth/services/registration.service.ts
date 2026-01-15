    import { Injectable, BadRequestException } from "@nestjs/common";
import { OtpService, OtpPurpose } from "../../../infrastructure/services/otp.service";
import { PasswordService } from "../../../infrastructure/services/password.service";
import { AuthDao } from "../auth.dao";

@Injectable()
export class RegistrationService {
  constructor(
    private readonly otpService: OtpService,
    private readonly passwordService: PasswordService,
    private readonly authDao: AuthDao,
  ) {}

  async initiateRegistration(email: string, phone: string) {
    if (!email || !phone) {
      throw new BadRequestException("Email and phone are required");
    }

    const exists = await this.authDao.findByEmailOrPhone(email, phone);
    if (exists) {
      throw new BadRequestException("User already exists");
    }

    await this.otpService.generateAndStore(
      OtpPurpose.REGISTER_EMAIL,
      email,
    );

    await this.otpService.generateAndStore(
      OtpPurpose.REGISTER_PHONE,
      phone,
    );

    return {
      message: "OTP sent to email and phone",
    };
  }

  async verifyEmailOtp(email: string, otp: string) {
    await this.otpService.verify(
      OtpPurpose.REGISTER_EMAIL,
      email,
      otp,
    );

    await this.otpService.markVerified(
      OtpPurpose.REGISTER_EMAIL,
      email,
    );

    return { message: "Email verified" };
  }

  async verifyPhoneOtp(phone: string, otp: string) {
    await this.otpService.verify(
      OtpPurpose.REGISTER_PHONE,
      phone,
      otp,
    );

    await this.otpService.markVerified(
      OtpPurpose.REGISTER_PHONE,
      phone,
    );

    return { message: "Phone verified" };
  }

  async completeRegistration(
    email: string,
    phone: string,
    password: string,
  ) {
    const emailVerified =
      await this.otpService.isVerified(OtpPurpose.REGISTER_EMAIL, email);
    const phoneVerified =
      await this.otpService.isVerified(OtpPurpose.REGISTER_PHONE, phone);

    if (!emailVerified || !phoneVerified) {
      throw new BadRequestException("Email or phone not verified");
    }

    const hashedPassword =
      await this.passwordService.hashPassword(password);

    const user = await this.authDao.createUser({
      email,
      phone,
      password: hashedPassword,
      isEmailVerified: true,
      isPhoneVerified: true,
    });

    await this.otpService.clearAll(email);
    await this.otpService.clearAll(phone);

    return {
      message: "User registered successfully",
      userId: user.id,      
    };
  }
}
