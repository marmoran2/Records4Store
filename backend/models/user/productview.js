'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductView = sequelize.define('ProductView', {
    view_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    session_id: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    viewed_at: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'ProductViews',
    timestamps: false
  });

ProductView.associate = function(models) {
  ProductView.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
  ProductView.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  ProductView.belongsTo(models.Session, { foreignKey: 'session_id', as: 'session' }); 
};

  return ProductView;
};