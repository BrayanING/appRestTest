'use strict';
module.exports = (sequelize, DataTypes) => {
  var Genre = sequelize.define('Genre', {
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
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    }
  }, {
    associate: function (models) {
      Genre.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      });

      Genre.hasMany(models.Album, {
        foreignKey: 'genreId',
        onDelete: 'CASCADE'
      });
    }
  });
  return Genre;
};