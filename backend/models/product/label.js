'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Label extends Model {
    static associate(models) {
      Label.hasMany(models.Release, { foreignKey: 'label_id' });
    }
  }

  Label.init({
    label_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    bio: DataTypes.TEXT,
    website: DataTypes.STRING,
    country: DataTypes.STRING,
    founded_year: DataTypes.SMALLINT
  }, {
    sequelize,
    modelName: 'Label',
    tableName: 'Labels',
    timestamps: false
  });

  return Label;
};