'use strict';
module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define('Genre', {
    genre_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false
    }
  }, {
    tableName: 'Genres',
    timestamps: false
  });

  Genre.associate = function(models) {
    Genre.hasMany(models.Release, { foreignKey: 'genre_id', as: 'releases' });
  };

  return Genre;
};