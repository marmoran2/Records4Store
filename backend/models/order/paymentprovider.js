'use strict';
module.exports = (sequelize, DataTypes) => {
  const PaymentProvider = sequelize.define('PaymentProvider', {
    provider_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    api_endpoint: {
      type: DataTypes.STRING,
      allowNull: true
    },
    support_email: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'PaymentProviders',
    timestamps: false
  });

  PaymentProvider.associate = function(models) {
    PaymentProvider.hasMany(models.Payment, { foreignKey: 'provider_id', as: 'payments' });
  };

  return PaymentProvider;
};
