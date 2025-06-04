'use strict';
module.exports = (sequelize, DataTypes) => {
  const Wishlist = sequelize.define('Wishlist', {
    wishlist_item_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    added_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'Wishlists',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['user_id', 'product_id']
      }
    ]
  });

  Wishlist.associate = function(models) {
    Wishlist.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    Wishlist.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
  };

  return Wishlist;
};