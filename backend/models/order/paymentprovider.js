'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PaymentProvider extends Model {
    static associate(models) {
      PaymentProvider.hasMany(models.Payment, {
        foreignKey: 'provider_id'
      });
    }
  }

  PaymentProvider.init({
    provider_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING,
    api_endpoint: DataTypes.STRING,
    support_email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PaymentProvider',
    tableName: 'PaymentProviders',
    timestamps: false
  });

  return PaymentProvider;
};