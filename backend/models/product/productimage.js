'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductImage = sequelize.define('ProductImage', {
    image_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    alt_text: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'ProductImages',
    timestamps: false
  });

  ProductImage.associate = function(models) {
    ProductImage.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
  };

  return ProductImage;
};