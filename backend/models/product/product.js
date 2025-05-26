'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      // Relationships
      Product.belongsTo(models.Release, { foreignKey: 'release_id' });

      Product.hasMany(models.ProductImage, { foreignKey: 'product_id' });
      Product.hasMany(models.OrderLine, { foreignKey: 'product_id' });
      Product.hasMany(models.CartItem, { foreignKey: 'product_id' });
      Product.hasMany(models.Wishlist, { foreignKey: 'product_id' });
      Product.hasMany(models.ProductView, { foreignKey: 'product_id' });

      // M:N with Category
      Product.belongsToMany(models.Category, {
        through: models.ProductCategory,
        foreignKey: 'product_id',
        otherKey: 'category_id'
      });

      // M:N with Tag
      Product.belongsToMany(models.Tag, {
        through: models.ProductTag,
        foreignKey: 'product_id',
        otherKey: 'tag_id'
      });
    }
  }

  Product.init({
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    release_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    barcode: DataTypes.BIGINT,
    size_inches: DataTypes.ENUM('7', '10', '12'),
    total_weight: DataTypes.INTEGER,
    total_dimensions: DataTypes.DECIMAL,
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    stock_qty: {
      type: DataTypes.DECIMAL,
      defaultValue: 0
    },
    stock_updated_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'Products',
    timestamps: false
  });

  return Product;
};