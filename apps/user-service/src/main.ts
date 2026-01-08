import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createSequelizeConnection } from './infrastructure/database/sequelize';

async function bootstrap() {
  // TEMP debug (remove later)
  console.log('DB_HOST:', process.env.DB_HOST);
  console.log('DB_PORT:', process.env.DB_PORT);
  console.log('DB_USER:', process.env.DB_USER);
  console.log('DB_NAME:', process.env.DB_NAME);

  const sequelize = createSequelizeConnection({
    host: process.env.DB_HOST!,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!, // user_db
  });

  // CONNECT DB FIRST
  await sequelize.authenticate();
  console.log('User DB connected');

  // START SERVER
  const app = await NestFactory.create(AppModule);
  await app.listen(3002);

  console.log('User service running on port 3002');
}

bootstrap();
