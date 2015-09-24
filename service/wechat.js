var models = require('../models');

var urlHelper = require('./urlHelper');
var https = require('https');

var Q = require('q');

// var utf8 = require('utf8');

exports.resolveUser = function(code) {
	var deferred = Q.defer();

	console.log('code:' + code);

	var getAccessTokenUrl = urlHelper.getAccessTokenUrl(code);
	var accesstokenReq = https.get(getAccessTokenUrl, function(res) {
		console.log(getAccessTokenUrl);
		res.on('data', function(chunk) {
			var jsonData = JSON.parse(chunk);
			console.log('access_token:' + jsonData.access_token);
			console.log('openid:' + jsonData.openid);
			var accessToken = jsonData.access_token;
			var openID = jsonData.openid;

			models.User.find({
				where: {
					openid: jsonData.openid
				}
			}).then(function(user) {
				if (user) {
					deferred.resolve(user.id);
				} 
				else {
					var getUserInfoUrl = urlHelper.getUserInfoUrl(accessToken, openID);
					var infoReq = https.get(getUserInfoUrl, function(res) {
						res.on('data', function(chunk) {
							var userData = JSON.parse(chunk);
							console.log('headimgurl:' + userData.headimgurl);
							// userData.nickname = utf8.encode(userData.nickname)
							models.User.create(userData)
								.then(function(newUser) {
									deferred.resolve(newUser.id);
								});
						});
					});
				}
			})
		});
		res.on('end', function() {
			console.log('no more data');
		});
	});

	return deferred.promise;
}