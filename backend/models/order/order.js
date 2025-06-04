'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    order_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    guest_email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    shipping_address_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    billing_address_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    order_status: {
      type: DataTypes.ENUM ('pending', 'shipped', 'refunded', 'rejected'),
      allowNull: false,
      defaultValue: 'pending'
    },
    subtotal_amount: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    tax_amount: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    shipping_cost: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    total_amount: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    order_date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'Orders',
    timestamps: false
  });

  Order.associate = function(models) {
    Order.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    Order.belongsTo(models.Address, { foreignKey: 'shipping_address_id', as: 'shipping_address' });
    Order.belongsTo(models.Address, { foreignKey: 'billing_address_id', as: 'billing_address' });
    Order.hasMany(models.OrderLine, { foreignKey: 'order_id', as: 'lines' });
    Order.hasOne(models.Payment, { foreignKey: 'order_id', as: 'payment' });
    Order.hasOne(models.OrderConfirmation, { foreignKey: 'order_id', as: 'confirmation' });
  };

  return Order;
};
