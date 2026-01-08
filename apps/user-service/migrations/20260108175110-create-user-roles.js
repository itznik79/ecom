'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_roles', {
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      role_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      assigned_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('user_roles');
  },
};
