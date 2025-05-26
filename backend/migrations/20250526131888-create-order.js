'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      order_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      user_id: {
        type: Sequelize.INTEGER, references: {
          model: 'Users',
          key: 'user_id',
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        },
        allowNull: true
      },
      shipping_address_id: {
        type: Sequelize.INTEGER, references: {
          model: 'Addresses',
          key: 'address_id',
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        },
      },
      billing_address_id: {
        type: Sequelize.INTEGER, references: {
          model: 'Addresses',
          key: 'address_id',
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        },
      },
      guest_email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      order_status: {
        type: Sequelize.ENUM('pending', 'paid', 'shipped', 'cancelled', 'refunded', 'rejected')
      },
      subtotal_amount: {
        	type: Sequelize.DECIMAL(10,2)
      },
      tax_amount: {
        type: Sequelize.INTEGER
      },
      shipping_amount: {
        type: Sequelize.DECIMAL(10,2)
      },
      total_amount: {
        	type: Sequelize.DECIMAL(10,2)
      },
      updated_at: {
        type: Sequelize.DATE
      },
      order_date: {
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
    await queryInterface.dropTable('Orders');
  }
};