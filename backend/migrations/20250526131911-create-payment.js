'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Payments', {
      payment_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      order_id: {
        type: Sequelize.BIGINT,
        references: {
          model: 'Orders', // Assuming the Orders table is created first
          key: 'order_id',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        },
      },
      provider_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'PaymentProviders',
          key: 'provider_id',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        },
      },
      method: {
        type: Sequelize.ENUM('card', 'paypal')
      },
      amount: {
        type: Sequelize.DECIMAL
      },
      status: {
        type: Sequelize.ENUM('pending', 'completed', 'failed', 'refunded', 'cancelled'),
      },
      processed_at: {
        type: Sequelize.DATE
      },
      provider_ref: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Payments');
  }
};