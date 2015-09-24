"use strict";

var models = require('../models');


module.exports = function(sequelize, DataTypes) {
  var Event = sequelize.define("Event", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    status: DataTypes.INTEGER,
    name: DataTypes.STRING,
    img: {
      type: DataTypes.STRING,
      defaultValue: 'http://wx.qlogo.cn/mmopen/YN4KvDpnViawsk9CXOvgPtkLyicJGBBmf6Qwh1AVrWhqDd6JlWMaGXwkzDCSfObZIlVuIvxJO2sZEvyhCQUK75BwrYzAvgFC0H/0'
    }
  }, {
    timestamps: true,
    classMethods: {
      associate: function(models) {
        Event.hasMany(models.Bless, {
          as: "blessses",
          foreignKey: "eventId"
        });
      }
    }
  });

  return Event;
};