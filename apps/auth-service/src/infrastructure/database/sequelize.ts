import { Sequelize } from 'sequelize-typescript';
import 'dotenv/config';
import { UserCredential } from './models/user-credential-model';
import { RefreshToken } from './models/refresh-token-model';

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: process.env.NODE_ENV === 'development',
  models: [UserCredential, RefreshToken],
});

export async function connectDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Postgres connected successfully');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
