import { Sequelize } from 'sequelize-typescript';
import 'dotenv/config';
import { UserCredential } from './models/user-credential-model';
import { RefreshToken } from './models/refresh-token-model';
import { Logger } from '@nestjs/common';

const logger = new Logger('Sequelize');

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: (msg) => logger.debug(msg),
  models: [UserCredential, RefreshToken],
});

export async function connectDatabase() {
  try {
    await sequelize.authenticate();
    logger.log('Postgres connected successfully');
  } catch (error) {
    logger.error('Unable to connect to the database', error);
    process.exit(1);
  }
}
