'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ReleaseArtist extends Model {
    static associate(models) {
      // N/A
    }
  }

  ReleaseArtist.init({
    release_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Releases',
        key: 'release_id'
      },
      onDelete: 'CASCADE'
    },
    artist_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Artists',
        key: 'artist_id'
      },
      onDelete: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'ReleaseArtist',
    tableName: 'ReleaseArtists',
    timestamps: false
  });

  return ReleaseArtist;
};