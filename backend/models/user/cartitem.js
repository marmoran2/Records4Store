'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    static associate(models) {
      CartItem.belongsTo(models.User, {
        foreignKey: 'user_id'
      });
      CartItem.belongsTo(models.Session, {
        foreignKey: 'session_id'
      });
      CartItem.belongsTo(models.Product, {
        foreignKey: 'product_id'
      });
    }
  }

  CartItem.init({
    cart_item_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: DataTypes.INTEGER,
    session_id: DataTypes.STRING,
    product_id: DataTypes.INTEGER,
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false
    },
    date_added: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'CartItem',
    tableName: 'CartItems',
    timestamps: false
  });

  return CartItem;
};