import { redisClient } from '../../infrastructure/redis/redis.client';

export async function storeAccessToken(
  userId: string,
  tokenId: string,
  expiresInSeconds: number,
) {
  const key = `access:${userId}:${tokenId}`;

  await redisClient.set(key, '1', {
    EX: expiresInSeconds,
  });
}

export async function isAccessTokenValid(
  userId: string,
  tokenId: string,
): Promise<boolean> {
  const key = `access:${userId}:${tokenId}`;
  const exists = await redisClient.get(key);
  return !!exists;
}

export async function revokeAccessToken(
  userId: string,
  tokenId: string,
) {
  const key = `access:${userId}:${tokenId}`;
  await redisClient.del(key);
}
