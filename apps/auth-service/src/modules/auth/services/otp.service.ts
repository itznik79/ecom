import { mailService } from '../../../infrastructure/mail/mail.service';
import { generateOtp } from '../../../common/utils/otp.util';
import { saveOtp } from '../../../common/utils/otp-redis.util';
import { getVerificationEmailTemplate, getForgotPasswordEmailTemplate } from '../templates/email.templates';

export async function sendRegisterOtp(email: string) {
  const otp = generateOtp();
  const redisKey = `otp:register:${email}`;

  await saveOtp(redisKey, otp);

  await mailService.sendMail(
    email,
    'Verify your email',
    getVerificationEmailTemplate(otp),
  );
}

export async function sendForgotPasswordOtp(email: string) {
  const otp = generateOtp();
  const redisKey = `otp:forgot_password:${email}`;

  await saveOtp(redisKey, otp);

  await mailService.sendMail(
    email,
    'Reset Password',
    getForgotPasswordEmailTemplate(otp),
  );
}
