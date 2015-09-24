"use strict";

var models = require('../models');


module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    openid: DataTypes.STRING,
    nickname: DataTypes.STRING,
    sex: DataTypes.INTEGER,
    country: DataTypes.STRING,
    province: DataTypes.STRING,
    city: DataTypes.STRING,
    headimgurl: DataTypes.STRING,
    unionid: DataTypes.STRING,
    code: DataTypes.STRING
  }, {
    timestamps: true,
  });

  return User;
};