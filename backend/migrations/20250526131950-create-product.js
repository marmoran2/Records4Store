'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      product_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      release_id: {
        type: Sequelize.INTEGER
        , references: {
          model: 'Releases', // Assuming the Releases table is created first
          key: 'release_id',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        }
      },
      image_id: {
        type: Sequelize.INTEGER
      },
      product_tag: {
        type: Sequelize.STRING
      },
      size_inches: {
        type: Sequelize.ENUM('7','10','12')
      },
      total_weight: {
        type: Sequelize.INTEGER
      },
      total_dimensions: {
        type: Sequelize.DECIMAL
      },
      price: {
        type: Sequelize.DECIMAL(10,2)
      },
      stock_qty: {
        type: Sequelize.INTEGER
      },
      stock_updated_at: {
        type: Sequelize.DATE
      },
      updated_at: {
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
    await queryInterface.dropTable('Products');
  }
};