'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Session extends Model {
    static associate(models) {
      Session.belongsTo(models.User, {
        foreignKey: 'user_id'
      });

      Session.hasMany(models.CartItem, {
        foreignKey: 'session_id'
      });

      Session.hasMany(models.ProductView, {
        foreignKey: 'session_id'
      });
    }
  }

  Session.init({
    session_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    user_id: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    expires_at: DataTypes.DATE,
    ip_address: DataTypes.STRING,
    user_agent: DataTypes.TEXT,
    is_valid: DataTypes.BOOLEAN,
    device_type: DataTypes.ENUM('desktop', 'mobile', 'tablet', 'other'),
    device_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Session',
    tableName: 'Sessions',
    timestamps: false
  });

  return Session;
};