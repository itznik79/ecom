import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { sequelize } from './infrastructure/database/sequelize';
import { winstonLogger } from './infrastructure/logger/winston.logger';
import { setupSwagger } from './infrastructure/swagger/swagger.setup';
import { connectRedis } from "./config/redis.config";
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
    await connectRedis();
  console.log("Auth service started");
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(winstonLogger);
  setupSwagger(app);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  winstonLogger.log(`Connecting to DB: ${process.env.DB_NAME}`);
  await sequelize.authenticate();
  winstonLogger.log('Auth DB connected');
  const port = Number(process.env.PORT) || 3001;
  await app.listen(port);
  winstonLogger.log(
    `${process.env.SERVICE_NAME || 'auth-service'} running on port ${port}`,
  );
}

bootstrap();
