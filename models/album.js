'use strict';
module.exports = (sequelize, DataTypes) => {
  var Album = sequelize.define('Album', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(80),
      unique: true,
      allowNull: false
    },
    artistId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    dateReleased: {
      type: DataTypes.DATE,
      allowNull: false
    },
    genreId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },{});

  Album.associate = function (models) {
    Album.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });

    Album.belongsTo(models.Artist, {
      foreignKey: 'ArtistId',
      onDelete: 'CASCADE'
    });

    Album.belongsTo(models.Artist, {
      foreignKey: 'ArtistId',
      onDelete: 'CASCADE'
    });

    Album.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });

    Album.hasMany(models.Track, {
      foreignKey: 'albumId',
      onDelete: 'CASCADE'
    });
  };
  
  return Album;
};