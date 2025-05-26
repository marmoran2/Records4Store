'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OrderLine extends Model {
    static associate(models) {
      OrderLine.belongsTo(models.Order, {
        foreignKey: 'order_id'
      });
      OrderLine.belongsTo(models.Product, {
        foreignKey: 'product_id'
      });
    }
  }

  OrderLine.init({
    order_line_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    order_id: DataTypes.BIGINT,
    product_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    unit_price: DataTypes.DECIMAL(10, 2)
  }, {
    sequelize,
    modelName: 'OrderLine',
    tableName: 'OrderLines',
    timestamps: false
  });

  return OrderLine;
};