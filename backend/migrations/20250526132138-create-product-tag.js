'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProductTags', {
      product_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
          references: {
        model: 'Products',
        key: 'product_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
      },
      tag_id: {
        type: Sequelize.INTEGER,
        primaryKey: true, references: {
          model: 'Tags', 
          key: 'tag_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
    await queryInterface.dropTable('ProductTags');
  }
};