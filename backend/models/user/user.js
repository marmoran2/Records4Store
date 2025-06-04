'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
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
      allowNull: false,
      defaultValue: true
    },
    user_role: {
      type: DataTypes.ENUM ('Customer', 'Admin'),
      allowNull: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    profile_url: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phone_number: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    failed_login_attempts: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    locked_until: {
      type: DataTypes.DATE,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    last_login_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'Users',
    timestamps: false
  });

  User.associate = function(models) {
    User.hasMany(models.Address, { foreignKey: 'user_id', as: 'addresses' });
    User.hasMany(models.Wishlist, { foreignKey: 'user_id', as: 'wishlist' });
    User.hasMany(models.ProductView, { foreignKey: 'user_id', as: 'views' });
    User.hasMany(models.Session, { foreignKey: 'user_id', as: 'sessions' });
    User.hasMany(models.Order, { foreignKey: 'user_id', as: 'orders' });
  };

  return User;
};
