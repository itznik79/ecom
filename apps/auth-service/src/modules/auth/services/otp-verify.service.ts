import { getOtp, deleteOtp } from '../../../common/utils/otp-redis.util';

export async function verifyRegisterOtp(
  email: string,
  otp: string,
): Promise<boolean> {
  const redisKey = `otp:register:${email}`;
  const savedOtp = await getOtp(redisKey);

  if (!savedOtp) return false;
  if (savedOtp !== otp) return false;

  await deleteOtp(redisKey);
  return true;
}

export async function verifyForgotPasswordOtp(
  email: string,
  otp: string,
): Promise<boolean> {
  const redisKey = `otp:forgot_password:${email}`;
  const savedOtp = await getOtp(redisKey);

  if (!savedOtp) return false;
  if (savedOtp !== otp) return false;

  await deleteOtp(redisKey);
  return true;
}
