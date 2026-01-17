import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { connectDatabase } from './infrastructure/database/sequelize';
import { connectRedis } from './infrastructure/redis/redis.client';
import { mailService } from './infrastructure/mail/mail.service';
import 'dotenv/config';

async function bootstrap() {
  await connectDatabase();
  await connectRedis();
  await mailService.verifyConnection();

  const app = await NestFactory.create(AppModule);
  await app.listen(3001);

  console.log('Auth service running on port 3001');
}

bootstrap();
