'use strict';
module.exports = (sequelize, DataTypes) => {
  const Track = sequelize.define('Track', {
    track_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    release_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    artist_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    track_number: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    duration_secs: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    preview_url: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    side: {
      type: DataTypes.STRING(2),
      allowNull: true
    }
  }, {
    tableName: 'Tracks',
    timestamps: false
  });

  Track.associate = function(models) {
    Track.belongsTo(models.Release, { foreignKey: 'release_id', as: 'release' });
    Track.belongsTo(models.Artist, { foreignKey: 'artist_id', as: 'artist' });
  };

  return Track;
};
