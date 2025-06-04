'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    release_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    size_inches: {
      type: DataTypes.ENUM ('7', '10', '12'),
      allowNull: true
    },
    total_weight: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    total_dimensions: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    stock_qty: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'Products',
    timestamps: false
  });

  Product.associate = function(models) {
    Product.belongsTo(models.Release, { foreignKey: 'release_id', as: 'release' });
    Product.hasMany(models.ProductImage, { foreignKey: 'product_id', as: 'images' });
    Product.hasMany(models.ProductView, { foreignKey: 'product_id', as: 'views' });
    Product.belongsToMany(models.Tag, {
      through: models.ProductTag,
      foreignKey: 'product_id',
      otherKey: 'tag_id',
      as: 'tags'
    });
  };

  return Product;
};