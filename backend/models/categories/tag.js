'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    static associate(models) {
      Tag.belongsToMany(models.Product, {
        through: models.ProductTag,
        foreignKey: 'tag_id'
      });
    }
  }

  Tag.init({
    tag_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(50), unique: true, allowNull: false }
  }, {
    sequelize,
    modelName: 'Tag',
    tableName: 'Tags',
    timestamps: false
  });

  return Tag;
};