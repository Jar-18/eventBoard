var models = require('../models');

exports.create = function(newUser) {
	return models.User.create(newUser);
}