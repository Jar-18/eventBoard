"use strict";

var models = require('../models');

module.exports = function(sequelize, DataTypes) {
  var Bless = sequelize.define("Bless", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: DataTypes.INTEGER,
    eventId: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {
    timestamps: true,
    classMethods: {
      associate: function(models) {
        Bless.belongsTo(models.User, {
          as: 'from',
          foreignKey: "userId"
        });
      }
    }
  });

  return Bless;
};