export async function seedPermissions(queryInterface) {
  await queryInterface.bulkInsert('permissions', [
    { name: 'CREATE_USER' },
    { name: 'DELETE_USER' },
    { name: 'CREATE_PRODUCT' },
    { name: 'VIEW_ORDER' },
  ]);
}
