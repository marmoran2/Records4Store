'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProductViews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'user_id', allowNull: true,
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        },
      },
      product_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Products',
          key: 'product_id',
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        },
      },
      session_id: {
        type: Sequelize.BIGINT,
        references: {
          model: 'Sessions',
          key: 'session_id',
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        },
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
    await queryInterface.dropTable('ProductViews');
  }
};