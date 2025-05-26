'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CartItems', {
      cart_item_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER, references: {
          model: 'Users',
          key: 'user_id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      },
      product_id: {
        type: Sequelize.INTEGER, references: {
          model: 'Products',
          key: 'product_id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      },
      session_id: {
        type: Sequelize.BIGINT, references: {
          model: 'Sessions',
          key: 'session_id',
          allowNull: true,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      },
      quantity: {
        type: Sequelize.INTEGER, defaultValue: 1, allowNull: false
      },
      date_added: {
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
    await queryInterface.dropTable('CartItems');
  }
};