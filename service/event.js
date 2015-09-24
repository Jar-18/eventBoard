var models = require('../models');

exports.create = function(newEvent) {
	return models.Event.create(newEvent);
}

exports.find = function(eventId) {
	return models.Event.find({
		where: {
			id: eventId
		}
	});
}