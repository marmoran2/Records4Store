'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OrderConfirmation extends Model {
    static associate(models) {
      OrderConfirmation.belongsTo(models.Order, {
        foreignKey: 'order_id'
      });
    }
  }

  OrderConfirmation.init({
    confirmation_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    order_id: DataTypes.BIGINT,
    pdf_url: DataTypes.STRING,
    email_sent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    issued_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'OrderConfirmation',
    tableName: 'OrderConfirmations',
    timestamps: false
  });

  return OrderConfirmation;
};