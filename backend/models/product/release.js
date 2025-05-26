'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Release extends Model {
    static associate(models) {
      Release.belongsTo(models.Label, { foreignKey: 'label_id' });
      Release.hasMany(models.Track, { foreignKey: 'release_id' });
      Release.hasMany(models.Product, { foreignKey: 'release_id' });
      Release.belongsToMany(models.Artist, {
        through: models.ReleaseArtist,
        foreignKey: 'release_id'
      });
    }
  }

  Release.init({
    release_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    label_id: DataTypes.INTEGER,
    catalog_number: DataTypes.STRING,
    release_title: DataTypes.STRING,
    release_year: DataTypes.STRING,
    released_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Release',
    tableName: 'Releases',
    timestamps: false
  });

  return Release;
};