import { mailService } from '../../../infrastructure/mail/mail.service';
import { generateOtp } from '../../../common/utils/otp.util';
import { saveOtp } from '../../../common/utils/otp-redis.util';

export async function sendRegisterOtp(email: string) {
  const otp = generateOtp();
  const redisKey = `otp:register:${email}`;

  await saveOtp(redisKey, otp);

  await mailService.sendMail(
    email,
    'Verify your email',
    `
      <h2>Email Verification</h2>
      <p>Your OTP is:</p>
      <h1>${otp}</h1>
      <p>This OTP will expire in 5 minutes.</p>
    `,
  );
}
