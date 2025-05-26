'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductView extends Model {
    static associate(models) {
      ProductView.belongsTo(models.User, {
        foreignKey: 'user_id'
      });
      ProductView.belongsTo(models.Session, {
        foreignKey: 'session_id'
      });
      ProductView.belongsTo(models.Product, {
        foreignKey: 'product_id'
      });
    }
  }

  ProductView.init({
    view_id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    session_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    viewed_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'ProductView',
    tableName: 'ProductViews',
    timestamps: false
  });

  return ProductView;
};