var env = process.env.NODE_ENV || "development";
var config = require('../config/config.json');
var https = require('https');
var jsSHA = require('jssha');
var Q = require('q');

exports.createTimestamp = function() {
  return parseInt(new Date().getTime() / 1000) + '';
};

exports.createNonceStr = function() {
  return Math.random().toString(36).substr(2, 15);
};

var getTicket = function() {
  var deferred = Q.defer();
  var accessToken;
  var ticket;
  https.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + config[env].wechat.appID + '&secret=' + config[env].wechat.appsecret, function(res) {
    //// 这个异步回调里可以获取access_token
    res.on('data', function(chunk) {
      var resData = JSON.parse(chunk);
      accessToken = resData.access_token;
      console.log(resData);
      console.log('jssdk_access_token: ' + accessToken);
    });

    res.on('end', function() {
      https.get('https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + accessToken + '&type=jsapi', function(_res) {
        // 这个异步回调里可以获取ticket
        _res.on('data', function(chunk) {
          var _resData = JSON.parse(chunk);
          console.log(_resData);
          ticket = _resData.ticket;
          console.log('ticket: ' + ticket);
          deferred.resolve(ticket);
        });
        _res.on('end', function() {});
      });
    });
  })
  return deferred.promise;
};

//计算数字签名并返回
exports.sign = function(timestamp, nonceStr, url) {

  return getTicket().then(function(ticket) {
    var signature;
    var string = 'jsapi_ticket=' + ticket + '&noncestr=' + nonceStr + '&timestamp=' + timestamp + '&url=' + url;
    shaObj = new jsSHA(string, 'TEXT');
    console.log("string: " + string);
    signature = shaObj.getHash('SHA-1', 'HEX');
    console.log('signature: '+signature);
    return signature;
  });

};

