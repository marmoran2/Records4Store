'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Releases', {
      release_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
      label_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Labels',
          key: 'label_id'
        },
        onDelete: 'CASCADE'
      },
      genre_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Genres',
          key: 'genre_id'
        },
        onDelete: 'SET NULL'
      },
      catalog_number: {
        type: Sequelize.STRING,
        allowNull: false
      },
      release_title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      released_date: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Releases');
  }
};