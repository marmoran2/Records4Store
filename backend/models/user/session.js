'use strict';
module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define('Session', {
    session_id: {
      type: DataTypes.STRING(128),
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    user_agent: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ip_address: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    is_valid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    tableName: 'Sessions',
    timestamps: false
  });

Session.associate = function(models) {
  Session.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  Session.hasMany(models.CartItem, { foreignKey: 'session_id', as: 'cart_items' });
  Session.hasMany(models.ProductView, { foreignKey: 'session_id', as: 'views' });
};

  return Session;
};