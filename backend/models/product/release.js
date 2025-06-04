'use strict';
module.exports = (sequelize, DataTypes) => {
  const Release = sequelize.define('Release', {
    release_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    label_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    genre_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    catalog_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    release_title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    released_date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'Releases',
    timestamps: false
  });

  Release.associate = function(models) {
    Release.belongsTo(models.Label, { foreignKey: 'label_id', as: 'label' });
    Release.belongsTo(models.Genre, { foreignKey: 'genre_id', as: 'genre' });
    Release.hasMany(models.Track, { foreignKey: 'release_id', as: 'tracks' });
    Release.hasMany(models.Product, { foreignKey: 'release_id', as: 'products' });
    Release.belongsTo(models.Artist, {
      foreignKey: 'artist_id',
      as: 'artist'
    });
  };

  return Release;
};