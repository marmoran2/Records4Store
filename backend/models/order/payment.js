'use strict';
module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    payment_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    order_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    provider_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    method: {
      type: DataTypes.ENUM ('card', 'paypal', 'bank'),
      allowNull: false

    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM ('pending', 'success', 'failed', 'error'),
      allowNull: false,
      defaultValue: 'pending'
    },
    processed_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    provider_ref: {
      type: DataTypes.STRING(120),
      allowNull: true
    }
  }, {
    tableName: 'Payments',
    timestamps: false
  });

  Payment.associate = function(models) {
    Payment.belongsTo(models.Order, { foreignKey: 'order_id', as: 'order' });
    Payment.belongsTo(models.PaymentProvider, { foreignKey: 'provider_id', as: 'provider' });
  };

  return Payment;
};
