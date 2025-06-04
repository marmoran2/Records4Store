'use strict';
module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define('CartItem', {
    cart_item_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    session_id: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date_added: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'CartItems',
    timestamps: false
  });

  CartItem.associate = function(models) {
    CartItem.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
    CartItem.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    CartItem.belongsTo(models.Session, { foreignKey: 'session_id', as: 'session' });
  };

  return CartItem;
};
