'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductTag = sequelize.define('ProductTag', {
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    tag_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  }, {
    tableName: 'ProductTags',
    timestamps: false
  });

  return ProductTag;
};