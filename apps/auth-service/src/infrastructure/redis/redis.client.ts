import { createClient } from 'redis';
import 'dotenv/config';

export const redisClient = createClient({
  url: process.env.REDIS_URL,
});

export async function connectRedis() {
  try {
    await redisClient.connect();
    console.log('Redis connected successfully');
  } catch (error) {
    console.error('Redis connection failed', error);
    process.exit(1);
  }
}
