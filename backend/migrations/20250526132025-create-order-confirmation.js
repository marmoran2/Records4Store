'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OrderConfirmations', {
      id: {
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
      pdf_url: {
        type: Sequelize.STRING
      },
      email_sent: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      issued_at: {
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
    await queryInterface.dropTable('OrderConfirmations');
  }
};