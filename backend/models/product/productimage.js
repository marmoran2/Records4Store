'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductImage extends Model {
    static associate(models) {
      ProductImage.belongsTo(models.Product, { foreignKey: 'product_id' });
    }
  }

  ProductImage.init({
    image_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    product_id: DataTypes.INTEGER,
    url: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'ProductImage',
    tableName: 'ProductImages',
    timestamps: false
  });

  return ProductImage;
};