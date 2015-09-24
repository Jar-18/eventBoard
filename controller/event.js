var wechatService = require('../service/wechat');
var blessService = require('../service/bless');

exports.list = function(req, res, next) {

  var code = req.query.code;

  if (code) {
    wechatService.resolveUser(code)
      .then(function(userId) {
        var eventId = 1;

        blessService.find(eventId)
          .then(function(blessList) {
            // res.json(blessList);
            console.log('ffffff');
            console.log('user' + userId);
            res.render('event/list', {
              to: 'Jar',
              eventId: eventId,
              userId: userId,
              blessList: blessList
            });
          });
      });
  } else {
    res.send('没有授权');
    // res.render('event/list', {
    //   to: 'Jar',
    //   eventId: 1,
    //   userId: 1,
    //   blessList: [{
    //     id: 1,
    //     content: '生日快乐呀',
    //     from: {
    //       nickname: '树',
    //       headimgurl: 'http://wx.qlogo.cn/mmopen/zRBWkTuHwX5SJIT2I4LfLR77oEKulVRgVlgPFjo0AibeFT64ffP21yt5LPlSNNh4Vz1JCdXDfefceUG2lFY8Greklob6cy7wo/0'
    //     }
    //   }]
    // });
  }
}