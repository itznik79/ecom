import { createSequelizeConnection, getSequelize } from '../database/sequelize';
import { seedRoles } from './seed-roles.seeder';
import { seedPermissions } from './seed-permissions.seeder';

async function runSeeders() {
  // 1️⃣ pehle sequelize initialize karo
  createSequelizeConnection({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'user_db',
  });

  // 2️⃣ ab instance lo
  const sequelize = getSequelize();
  const queryInterface = sequelize.getQueryInterface();

  // 3️⃣ seeders run karo
  await seedRoles(queryInterface);
  await seedPermissions(queryInterface);

  console.log('Seeders executed successfully');
}

runSeeders();
