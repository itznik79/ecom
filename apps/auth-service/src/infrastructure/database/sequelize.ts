import { Sequelize } from 'sequelize-typescript';
import 'dotenv/config';

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: String(process.env.DB_PASSWORD) || 'postgres',
  database: process.env.DB_NAME,
  logging: false,
});
