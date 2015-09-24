var models = require('../models');

exports.create = function(newBless) {
	return models.Bless.create(newBless);
}

exports.find = function(eventId) {
	return models.Bless.findAll({
		where: {
			eventId: eventId
		},
		include: [{
			model: models.User,
			as: "from"
		}],
		order: 'createdAt'
	});
}