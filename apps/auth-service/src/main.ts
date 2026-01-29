import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { connectDatabase } from './infrastructure/database/sequelize';
import { connectRedis } from './infrastructure/redis/redis.client';
import { mailService } from './infrastructure/mail/mail.service';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import cookieParser from 'cookie-parser';


async function bootstrap() {
  await connectDatabase();
  await connectRedis();
  await mailService.verifyConnection();

  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.use(cookieParser());

  // Enable CORS if needed, or other global settings

  const port = process.env.APP_PORT || 3001;
  await app.listen(port);

  console.log(`Auth service running on port ${port}`);
}

bootstrap();
