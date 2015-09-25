var models = require('../models');

exports.find = function(code) {
	return models.UsedCode.find({
		where: {
			code: code
		}
	});
}

exports.create = function(code) {
	return models.UsedCode.create({
		code: code
	});
}