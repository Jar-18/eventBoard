"use strict";

var models = require('../models');

module.exports = function(sequelize, DataTypes) {
  var UsedCode = sequelize.define("UsedCode", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    code: DataTypes.STRING
  }, {
    timestamps: true,
  });

  return UsedCode;
};