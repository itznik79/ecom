'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('role_permissions', {
      role_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      permission_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('role_permissions');
  },
};
