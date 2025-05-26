'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      user_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull: true
      },
      is_guest: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      user_role: {
        type: Sequelize.ENUM('admin', 'customer'),
        defaultValue: 'customer'
      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      email_verified_at: {
        type: Sequelize.DATE
      },
      profile_photo_url: {
        type: Sequelize.STRING
      },
      phone_number: {
        type: Sequelize.STRING
      },
      failed_login_attempts: {
        type: Sequelize.INTEGER
      },
      locked_until: {
        type: Sequelize.DATE
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      last_login_at: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};