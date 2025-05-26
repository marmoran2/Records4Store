'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Addresses', {
      address_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // Assuming the Users table is created first
          key: 'user_id',
          allowNull: true,
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE'
        },
      },
      line1: {
        type: Sequelize.STRING,
        allowNull: false
      },
      line2: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      postcode: {
        type: Sequelize.STRING,
        allowNull: false
      },
      country_code: {
        type: Sequelize.STRING
      },
      is_primary: {
        type: Sequelize.BOOLEAN
      },
      created_at: {
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
    await queryInterface.dropTable('Addresses');
  }
};