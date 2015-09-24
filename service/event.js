var models = require('../models');

exports.create = function(newEvent) {
	return models.Event.create(newEvent);
}