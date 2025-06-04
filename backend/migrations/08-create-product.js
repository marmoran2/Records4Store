'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      product_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      release_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Releases',
          key: 'release_id'
        },
        onDelete: 'CASCADE'
      },
      size_inches: {
        type: Sequelize.ENUM ('7', '10', '12'),
      },
      total_weight: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      total_dimensions: {
        type: Sequelize.STRING,
        allowNull: false
      },
      price: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      stock_qty: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  }
};