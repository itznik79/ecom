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
