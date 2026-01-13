import { QueryInterface } from 'sequelize';

export async function seedRoles(queryInterface: QueryInterface) {
  await queryInterface.bulkInsert('roles', [
    {
      name: 'SUPER_ADMIN',
      description: 'System Super Admin',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'CUSTOMER',
      description: 'Ecommerce Customer',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
}
