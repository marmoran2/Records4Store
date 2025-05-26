'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Category, {
        foreignKey: 'parent_id',
        as: 'subcategories'
      });
      Category.belongsTo(models.Category, {
        foreignKey: 'parent_id',
        as: 'parent'
      });

      Category.belongsToMany(models.Product, {
        through: models.ProductCategory,
        foreignKey: 'category_id'
      });
    }
  }

  Category.init({
    category_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    parent_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    type: DataTypes.ENUM('genre', 'era', 'label', 'style', 'release type (LP/EP)'),
    slug: { type: DataTypes.STRING, unique: true },
    description: DataTypes.STRING,
    sort_order: DataTypes.INTEGER,
    visible: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Category',
    tableName: 'Categories',
    timestamps: false
  });

  return Category;
};
