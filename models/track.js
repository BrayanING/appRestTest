'use strict';
module.exports = (sequelize, DataTypes) => {
  var Track = sequelize.define('Track', {
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
    description: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validation: {
        max: 200
      }
    },
    albumId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
    
  }, {});
  Track.associate = function (models) {
    Track.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });

    Track.belongsTo(models.Album, {
      foreignKey: 'albumId',
      onDelete: 'CASCADE'
    });
  };
  
  return Track;
};