'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Artists', {
      artist_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      artist_name: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      bio: {
        type: Sequelize.TEXT
      },
      country: {
        type: Sequelize.STRING(100)
      },
      website: {
        type: Sequelize.STRING(255)
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Artists');
  }
};