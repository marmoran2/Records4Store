'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductTag extends Model {
    static associate(models) {
      // N/A: join table
    }
  }

  ProductTag.init({
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Products',
        key: 'product_id'
      },
      onDelete: 'CASCADE'
    },
    tag_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Tags',
        key: 'tag_id'
      },
      onDelete: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'ProductTag',
    tableName: 'ProductTags',
    timestamps: false
  });

  return ProductTag;
};