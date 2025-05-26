'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ReleaseArtists', {
      release_id: {
        type: Sequelize.INTEGER, primaryKey: true
        , references: {
          model: 'Releases',
          key: 'release_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      artist_id: {
        type: Sequelize.INTEGER, primaryKey: true,
        references: {
          model: 'Artists',
          key: 'artist_id'
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
    await queryInterface.dropTable('ReleaseArtists');
  }
};