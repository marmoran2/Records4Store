'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Track extends Model {
    static associate(models) {
      Track.belongsTo(models.Release, { foreignKey: 'release_id' });
      Track.belongsTo(models.Artist, { foreignKey: 'artist_id' });
    }
  }

  Track.init({
    track_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    artist_id: DataTypes.INTEGER,
    release_id: DataTypes.INTEGER,
    track_number: DataTypes.SMALLINT,
    title: DataTypes.STRING,
    duration_secs: DataTypes.INTEGER,
    preview_url: DataTypes.STRING(500),
    side: DataTypes.ENUM('A', 'B'),
    plate_number: DataTypes.SMALLINT
  }, {
    sequelize,
    modelName: 'Track',
    tableName: 'Tracks',
    timestamps: false
  });

  return Track;
};