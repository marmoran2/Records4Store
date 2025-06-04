'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderConfirmation = sequelize.define('OrderConfirmation', {
    confirmation_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    order_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true
    },
    pdf_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    email_sent: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    issued_at: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'OrderConfirmations',
    timestamps: false
  });

  OrderConfirmation.associate = function(models) {
    OrderConfirmation.belongsTo(models.Order, {
      foreignKey: 'order_id',
      as: 'order'
    });
  };

  return OrderConfirmation;
};
