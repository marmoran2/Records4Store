'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    static associate(models) {
      Payment.belongsTo(models.Order, {
        foreignKey: 'order_id'
      });
      Payment.belongsTo(models.PaymentProvider, {
        foreignKey: 'provider_id'
      });
    }
  }

  Payment.init({
    payment_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    order_id: DataTypes.BIGINT,
    provider_id: DataTypes.INTEGER,
    method: DataTypes.ENUM('card', 'paypal'),
    amount: DataTypes.DECIMAL(10, 2),
    status: DataTypes.ENUM('pending', 'paid', 'failed'),
    processed_at: DataTypes.DATE,
    provider_ref: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Payment',
    tableName: 'Payments',
    timestamps: false
  });

  return Payment;
};