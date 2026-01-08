import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { sequelize } from './infrastructure/database/sequelize';
import * as dotenv from 'dotenv';
import 'dotenv/config';

async function bootstrap() {
  // load env
  dotenv.config();
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_USER:', process.env.DB_USER);
console.log(
  'DB_PASSWORD:',
  process.env.DB_PASSWORD,
  'type:',
  typeof process.env.DB_PASSWORD,
);
console.log('DB_NAME:', process.env.DB_NAME);

  // connect database first
  await sequelize.authenticate();
  // await sequelize.sync({ alter: true });
  console.log('Auth DB connected');

  // start server
  const app = await NestFactory.create(AppModule);
  await app.listen(3001);

  console.log('Auth service running on port 3001');
}

bootstrap();
