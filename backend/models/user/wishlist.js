'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Wishlist extends Model {
    static associate(models) {
      Wishlist.belongsTo(models.User, {
        foreignKey: 'user_id'
      });
      Wishlist.belongsTo(models.Product, {
        foreignKey: 'product_id'
      });
    }
  }

  Wishlist.init({
    wishlist_item_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    added_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Wishlist',
    tableName: 'Wishlists',
    timestamps: false
  });

  return Wishlist;
};