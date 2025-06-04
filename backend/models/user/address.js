'use strict';
module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('Address', {
    address_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    line1: {
      type: DataTypes.STRING,
      allowNull: false
    },
    line2: {
      type: DataTypes.STRING,
      allowNull: true
    },
    postcode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country_code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    is_primary: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'Addresses',
    timestamps: false
  });

  Address.associate = function(models) {
    Address.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    Address.hasMany(models.Order, { foreignKey: 'shipping_address_id', as: 'shipping_orders' });
    Address.hasMany(models.Order, { foreignKey: 'billing_address_id', as: 'billing_orders' });
  };

  return Address;
};