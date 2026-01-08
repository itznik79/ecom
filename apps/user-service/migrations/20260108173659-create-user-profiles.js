'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_profiles', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true,
      },
      first_name: {
        type: Sequelize.STRING,
      },
      last_name: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true,
      },
      avatar_url: {
        type: Sequelize.STRING,
      },
      dob: {
        type: Sequelize.DATEONLY,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('user_profiles');
  },
};
