import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createSequelizeConnection } from './infrastructure/database/sequelize';
import { setupSwagger } from './infrastructure/swagger/swagger.setup';
import { winstonLogger } from './infrastructure/database/logger/winston.logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(winstonLogger);
  setupSwagger(app);
  const sequelize = createSequelizeConnection({
    host: process.env.DB_HOST!,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!, // user_db
  });
  winstonLogger.log(`Connecting to DB: ${process.env.DB_NAME}`);
  await sequelize.authenticate();
  winstonLogger.log('User DB connected');
  const port = Number(process.env.PORT) || 3002;
  await app.listen(port);

  winstonLogger.log(
    `${process.env.SERVICE_NAME || 'user-service'} running on port ${port}`,
  );
}

bootstrap();
