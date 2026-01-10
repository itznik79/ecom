import { Sequelize } from 'sequelize-typescript';
import { Role } from './models/user-role.model';
import { Permission } from './models/permission.model';

let sequelize: Sequelize | null = null;

export function createSequelizeConnection(config: {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}) {
  if (!sequelize) {
    sequelize = new Sequelize({
      dialect: 'postgres',
      host: config.host,
      port: config.port,
      username: config.username,
      password: config.password,
      database: config.database,
      logging: false,
      models: [Role, Permission],
    });
  }

  return sequelize;
}

export function getSequelize(): Sequelize {
  if (!sequelize) {
    throw new Error('Sequelize has not been initialized');
  }
  return sequelize;
}
