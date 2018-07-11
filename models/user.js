'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
     id: {
       type: DataTypes.INTEGER,
       autoIncrement: true,
       allowNull: false,
       primaryKey: true
     },
    name: {
      type: DataTypes.STRING(80),
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
      validation:{
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING(100),
    },
    img: {
      type: DataTypes.STRING(80),
      allowNull: false,
      defaultValue: 'NINGUNA'
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {});

  User.associate = function (models) {
     User.hasMany(models.Genre, {
       foreignKey: 'userId',
       onDelete: 'CASCADE'
     });

     User.hasMany(models.Artist, {
       foreignKey: 'userId',
       onDelete: 'CASCADE'
     })

     User.hasMany(models.Album, {
       foreignKey: 'userId',
       onDelete: 'CASCADE'
     });

     User.hasMany(models.Track, {
       foreignKey: 'userId',
       onDelete: 'CASCADE'
     });
  };

  return User;
};