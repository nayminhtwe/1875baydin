'use strict';
const bcrypt = require('bcryptjs')
require('dotenv').config()
const saultRounds = 10

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING
    }
  }, {});
  //hooks
  User.beforeCreate((model, options) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(model.password, saultRounds, (err, hashed) => {
          if (err) reject(err)
          model.password = hashed
          resolve('success')
        })
    })
  })
  User.associate = function(models) {
    User.hasMany(models.Subscription, {
      foreignKey: 'user_id'
    })
  };
  return User;
};