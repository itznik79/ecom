import { setKey, getKey, deleteKey } from './access-token-redis.util';
import { OTP_EXPIRY_SECONDS } from '../constants/otp.constants';

export async function saveOtp(
  key: string,
  otp: string,
): Promise<void> {
  await setKey(key, otp, OTP_EXPIRY_SECONDS);
}

export async function getOtp(key: string): Promise<string | null> {
  const value = await getKey(key);

  if (!value) return null;

  return value;
}

export async function deleteOtp(key: string): Promise<void> {
  await deleteKey(key);
}
