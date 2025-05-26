'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Sessions', {

      session_id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER, references: {
          model: 'Users',
          key: 'user_id',
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        },
      },
      created_at: {
        type: Sequelize.DATE
      },
      expires_at: {
        type: Sequelize.DATE
      },
      ip_address: {
        type: Sequelize.STRING
      },
      user_agent: {
        type: Sequelize.TEXT
      },
      is_valid: {
        type: Sequelize.BOOLEAN
      },
      device_type: {
        type: Sequelize.ENUM('desktop', 'mobile', 'tablet', 'other')
      },
      device_name: {
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Sessions');
  }
};