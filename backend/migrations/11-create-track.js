'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Tracks', {
      track_id: {
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
      artist_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Artists',
          key: 'artist_id'
        },
        onDelete: 'CASCADE'
      },
      track_number: {
        type: Sequelize.SMALLINT,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      duration_secs: {
        type: Sequelize.INTEGER
      },
      preview_url: {
        type: Sequelize.STRING(500)
      },
      side: {
  type: Sequelize.STRING(16), 
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Tracks');
  }
};