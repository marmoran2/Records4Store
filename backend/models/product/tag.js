'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    tag_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'Tags',
    timestamps: false
  });

  Tag.associate = function(models) {
    Tag.belongsToMany(models.Product, {
      through: models.ProductTag,
      foreignKey: 'tag_id',
      otherKey: 'product_id',
      as: 'products'
    });
  };

  return Tag;
};