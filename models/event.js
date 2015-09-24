"use strict";

var models = require('../models');


module.exports = function(sequelize, DataTypes) {
  var Event = sequelize.define("Event", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {
    timestamps: true,
    classMethods: {
      associate: function(models) {
        Event.hasMany(models.Bless, {
          as: "blessses",
          foreignKey: "eventId"
        });
        Event.belongsTo(models.User, {
          as: "targetUser",
          foreignKey: "userId"
        });
      }
    }
  });

  return Event;
};