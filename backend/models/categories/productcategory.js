'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductCategory extends Model {
    static associate(models) {
      // N/A: join table
    }
  }

  ProductCategory.init({
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Products',
        key: 'product_id'
      },
      onDelete: 'CASCADE'
    },
    category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Categories',
        key: 'category_id'
      },
      onDelete: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'ProductCategory',
    tableName: 'ProductCategories',
    timestamps: false
  });

  return ProductCategory;
};