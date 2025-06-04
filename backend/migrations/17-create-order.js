'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      order_id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'user_id'
        },
        onDelete: 'SET NULL'
      },
      guest_email: {
        type: Sequelize.STRING
      },
      shipping_address_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Addresses',
          key: 'address_id'
        },
        onDelete: 'SET NULL'
      },
      billing_address_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Addresses',
          key: 'address_id'
        },
        onDelete: 'SET NULL'
      },
      order_status: {
        type: Sequelize.ENUM ('pending', 'shipped', 'refunded', 'rejected'),
        allowNull: false,
        defaultValue: 'pending'
      },
      subtotal_amount: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      tax_amount: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      shipping_cost: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      total_amount: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      order_date: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Orders');
  }
};