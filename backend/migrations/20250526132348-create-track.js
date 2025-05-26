'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tracks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      artist_id: {
        type: Sequelize.INTEGER,
        REFERENCES: {
          model: 'Artists',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
      },
      release_id: {
        type: Sequelize.INTEGER
        , references: {
          model: 'Releases',
          key: 'release_id' ,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      },
      track_number: {
        type: Sequelize.SMALLINT
      },
      title: {
        type: Sequelize.STRING
      },
      duration_secs: {
        type: Sequelize.INTEGER
      },
      preview_url: {
        type: Sequelize.STRING(500)
      },
      side: {
        	type: Sequelize.ENUM('A','B')
      },
      plate_number: {
        type: Sequelize.SMALLINT
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
    await queryInterface.dropTable('Tracks');
  }
};