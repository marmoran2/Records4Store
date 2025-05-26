'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Associations
     */
    static associate(models) {
      // One-to-Many: User → Address
      User.hasMany(models.Address, {
        foreignKey: 'user_id',
        as: 'addresses'
      });

      // One-to-Many: User → Session
      User.hasMany(models.Session, {
        foreignKey: 'user_id',
        as: 'sessions'
      });

      // One-to-Many: User → CartItem
      User.hasMany(models.CartItem, {
        foreignKey: 'user_id',
        as: 'cartItems'
      });

      // One-to-Many: User → Wishlist
      User.hasMany(models.Wishlist, {
        foreignKey: 'user_id',
        as: 'wishlist'
      });

      // One-to-Many: User → ProductView
      User.hasMany(models.ProductView, {
        foreignKey: 'user_id',
        as: 'views'
      });

      // One-to-Many: User → Order
      User.hasMany(models.Order, {
        foreignKey: 'user_id',
        as: 'orders'
      });
    }
  }

  User.init({
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: true
    },
    is_guest: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email_verified_at: DataTypes.DATE,
    profile_photo_url: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    failed_login_attempts: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    locked_until: DataTypes.DATE,
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    last_login_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    timestamps: false
  });

  return User;
};