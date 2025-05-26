'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProductImages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_id: {
        type: Sequelize.INTEGER, references: {
          model: 'Products', // Assuming the Products table is created first
          key: 'product_id',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        },
      },
      url: {
        type: Sequelize.STRING
      },
      alt_text: {
        type: Sequelize.STRING
      },
      sort_order: {
        type: Sequelize.INTEGER
      },
      is_thumbnail: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('ProductImages');
  }
};