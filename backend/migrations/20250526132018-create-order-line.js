'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OrderLines', {
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
      product_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Products', // Assuming the Products table is created first
          key: 'product_id',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        },
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      unit_price: {
        type: Sequelize.DECIMAL(10,2)
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
    await queryInterface.dropTable('OrderLines');
  }
};