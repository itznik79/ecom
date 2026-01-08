import { Sequelize } from 'sequelize-typescript';

export function createSequelize(options: {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}) {
  return new Sequelize({
    dialect: 'postgres',
    host: options.host,
    port: options.port,
    username: options.username,
    password: options.password,
    database: options.database,
    logging: false,
  });
}
