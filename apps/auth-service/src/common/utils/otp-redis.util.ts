import { redisClient } from '../../infrastructure/redis/redis.client';
import { OTP_EXPIRY_SECONDS } from '../constants/otp.constants';

export async function saveOtp(
  key: string,
  otp: string,
): Promise<void> {
  await redisClient.set(key, otp, {
    EX: OTP_EXPIRY_SECONDS,
  });
}

export async function getOtp(key: string): Promise<string | null> {
  const value = await redisClient.get(key);

  if (!value) return null;

  return typeof value === 'string' ? value : value.toString();
}

export async function deleteOtp(key: string): Promise<void> {
  await redisClient.del(key);
}
