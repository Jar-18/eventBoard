var wechatService = require('../service/wechat');
var blessService = require('../service/bless');
var eventService = require('../service/event');

var sharingHandler = require('../service/sharing');

var eventData = require('../data/event.json');

var env = process.env.NODE_ENV || "development";
var config = require('../config/config.json');

var Q = require('q');

exports.list = function(req, res, next) {

  var code = req.query.code;
  var eventId = req.query.state || req.query.eventId;

  var to = eventData[eventId - 1].name;

  if (code) {

    var timestamp = sharingHandler.createTimestamp();
    var nonceStr = sharingHandler.createNonceStr();
    //获取当前url
    var url = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log("url: " + url);

    Q.all([wechatService.resolveUser(code), eventService.find(eventId), blessService.find(eventId), sharingHandler.sign(timestamp, nonceStr, url)])
      .then(function(resArr) {
        // console.log('come here');
        console.log(resArr);
        res.render('event/list', {
          to: resArr[1].name,
          eventImg: resArr[1].img,
          eventId: eventId,
          userId: resArr[0],
          blessList: resArr[2],
          appId: config[env].wechat.appID,
          timestamp: timestamp,
          nonceStr: nonceStr,
          signature: resArr[3]
        });
      });
  } else {
    // res.send('没有授权');

    blessService.find(eventId)
      .then(function(blessList) {

        res.render('event/list', {
          to: to,
          eventImg: 'http://wx.qlogo.cn/mmopen/zRBWkTuHwX5SJIT2I4LfLR77oEKulVRgVlgPFjo0AibeFT64ffP21yt5LPlSNNh4Vz1JCdXDfefceUG2lFY8Greklob6cy7wo/0',
          eventId: eventId,
          blessList: blessList
        });
      });

  }
}