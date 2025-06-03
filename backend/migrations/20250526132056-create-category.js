'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Categories', {
      category_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      parent_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories',
          key: 'category_id'
        },
      },
      name: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.ENUM('genre', 'era', 'label', 'style', 'release type (LP/EP)')
      },
      slug: {
        type: Sequelize.STRING,
        unique: true
      },
      description: {
        type: Sequelize.STRING
      },
      visible: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
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
    await queryInterface.dropTable('Categories');
  }
};