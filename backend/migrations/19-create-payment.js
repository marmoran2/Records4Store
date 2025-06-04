'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Payments', {
      payment_id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      order_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'Orders',
          key: 'order_id'
        },
        onDelete: 'CASCADE'
      },
      provider_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'PaymentProviders',
          key: 'provider_id'
        },
        onDelete: 'SET NULL'
      },
      method: {
        type: Sequelize.ENUM ('card', 'paypal', 'bank'),
        allowNull: false
      },
      amount: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM ('pending', 'success', 'failed', 'error'),
        allowNull: false,
        defaultValue: 'pending'
      },
      processed_at: {
        type: Sequelize.DATE
      },
      provider_ref: {
        type: Sequelize.STRING(120)
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Payments');
  }
};