'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Releases', {
      release_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      label_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Labels',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'  
        },
      },
      catalog_number: {
        type: Sequelize.STRING,
        unique: true
      },
      release_title: {
        type: Sequelize.STRING
      },
      release_year: {
        type: Sequelize.SMALLINT
      },
      released_date: {
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
    await queryInterface.dropTable('Releases');
  }
};