import redisClient from "../../config/redis.config";
import { generateOtp } from "../../shared/otp.util";

const OTP_TTL = 300; // 5 minutes

export type OtpPurpose =
  | "signup"
  | "reset_password"
  | "change_password";

export class OtpService {
  private buildKey(purpose: OtpPurpose, identifier: string): string {
    return `otp:${purpose}:${identifier}`;
  }

  async generateAndStore(
    purpose: OtpPurpose,
    identifier: string
  ) {
    const otp = generateOtp();
    const key = this.buildKey(purpose, identifier);

    await redisClient.set(key, otp, {
      EX: OTP_TTL,
    });

    return {
      otp,
      expiresIn: OTP_TTL,
    };
  }

  async verify(
    purpose: OtpPurpose,
    identifier: string,
    inputOtp: string
  ) {
    const key = this.buildKey(purpose, identifier);
    const storedOtp = await redisClient.get(key);

    if (!storedOtp) {
      throw new Error("OTP expired or not found");
    }

    if (storedOtp !== inputOtp) {
      throw new Error("Invalid OTP");
    }

    await redisClient.del(key);
    return true;
  }

  async invalidate(
    purpose: OtpPurpose,
    identifier: string
  ) {
    const key = this.buildKey(purpose, identifier);
    await redisClient.del(key);
  }
}
