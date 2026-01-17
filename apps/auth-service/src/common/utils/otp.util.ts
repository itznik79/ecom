import { OTP_LENGTH } from '../constants/otp.constants';

export function generateOtp(): string {
  let otp = '';
  for (let i = 0; i < OTP_LENGTH; i++) {
    otp += Math.floor(Math.random() * 10);
  }
  return otp;
}
