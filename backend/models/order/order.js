'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, {
        foreignKey: 'user_id'
      });

      Order.belongsTo(models.Address, {
        foreignKey: 'shipping_address_id',
        as: 'shippingAddress'
      });

      Order.belongsTo(models.Address, {
        foreignKey: 'billing_address_id',
        as: 'billingAddress'
      });

      Order.hasMany(models.OrderLine, {
        foreignKey: 'order_id'
      });

      Order.hasOne(models.OrderConfirmation, {
        foreignKey: 'order_id'
      });

      Order.hasMany(models.Payment, {
        foreignKey: 'order_id'
      });
    }
  }

  Order.init({
    order_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    shipping_address_id: DataTypes.INTEGER,
    billing_address_id: DataTypes.INTEGER,
    guest_email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    order_status: {
      type: DataTypes.ENUM('pending', 'paid', 'shipped', 'cancelled', 'refunded', 'rejected'),
      defaultValue: 'pending'
    },
    subtotal_amount: DataTypes.DECIMAL(10, 2),
    tax_amount: DataTypes.INTEGER,
    shipping_amount: DataTypes.DECIMAL(10, 2),
    total_amount: DataTypes.DECIMAL(10, 2),
    updated_at: DataTypes.DATE,
    order_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Order',
    tableName: 'Orders',
    timestamps: false
  });

  return Order;
};