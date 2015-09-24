var config = require('../config/config.json');
var env = process.env.NODE_ENV || "development";

exports.getAccessTokenUrl = function(code) {
	return 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + config[env].wechat.appID + '&secret=' + config[env].wechat.appsecret + '&code=' + code + '&grant_type=authorization_code';
}

exports.getUserInfoUrl = function(accessToken, openID) {
	return 'https://api.weixin.qq.com/sns/userinfo?access_token=' + accessToken + '&openid=' + openID + '&lang=zh_CN';
}