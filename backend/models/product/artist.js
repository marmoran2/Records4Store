'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Artist extends Model {
    static associate(models) {
      Artist.belongsToMany(models.Release, {
        through: models.ReleaseArtist,
        foreignKey: 'artist_id'
      });

      Artist.hasMany(models.Track, {
        foreignKey: 'artist_id'
      });
    }
  }

  Artist.init({
    artist_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    artist_name: DataTypes.STRING,
    bio: DataTypes.TEXT,
    country: DataTypes.STRING,
    website: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Artist',
    tableName: 'Artists',
    timestamps: false
  });

  return Artist;
};