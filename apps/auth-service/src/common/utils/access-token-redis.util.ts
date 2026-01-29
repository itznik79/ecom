import { redisClient } from '../../infrastructure/redis/redis.client';

export async function setKey(
  key: string,
  value: string,
  expiresInSeconds?: number,
): Promise<void> {
  if (expiresInSeconds) {
    await redisClient.set(key, value, {
      EX: expiresInSeconds,
    });
  } else {
    await redisClient.set(key, value);
  }
}

export async function getKey(key: string): Promise<string | null> {
  const value = await redisClient.get(key);
  if (value === null) return null;
  return value.toString();
}

export async function deleteKey(key: string): Promise<void> {
  await redisClient.del(key);
}

export async function storeAccessToken(
  userId: string,
  tokenId: string,
  expiresInSeconds: number,
) {
  const key = `access:${userId}:${tokenId}`;
  await setKey(key, '1', expiresInSeconds);
}

export async function isAccessTokenValid(
  userId: string,
  tokenId: string,
): Promise<boolean> {
  const key = `access:${userId}:${tokenId}`;
  const exists = await getKey(key);
  return !!exists;
}

export async function revokeAccessToken(
  userId: string,
  tokenId: string,
) {
  const key = `access:${userId}:${tokenId}`;
  await deleteKey(key);
}
