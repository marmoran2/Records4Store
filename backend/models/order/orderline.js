'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderLine = sequelize.define('OrderLine', {
    order_line_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    order_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    unit_price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    tableName: 'OrderLines',
    timestamps: false
  });

  OrderLine.associate = function(models) {
    OrderLine.belongsTo(models.Order, { foreignKey: 'order_id', as: 'order' });
    OrderLine.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
  };

  return OrderLine;
};