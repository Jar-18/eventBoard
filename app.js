var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session');

var wechat = require('wechat');

var routes = require('./routes');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.query());

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

var config = require('./config/config.json');
var env = process.env.NODE_ENV || "development";

var wechatConfig = {
  token: config[env].wechat.token,
  appid: config[env].wechat.appID,
  encodingAESKey: 'encodinAESKey'
};

app.use(express.query());

var links1 = "";
var links2 = "";

var eventData = require('./data/event.json');

app.use('/wechat', wechat(config[env].wechat.token, function(req, res, next) {
  var message = req.weixin;
  console.log(message);

  var replyStr;


  if ((message.MsgType === 'event') && (message.Event === 'subscribe')) {
    replyStr = '感谢你的关注' + '\n' + '快点击下方Bless按钮找到你的小伙伴送出你的生日祝福吧' + '\n';
  } else if ((message.MsgType === 'event') && (message.EventKey === 'bless1')) {
    if (!links1) {
      for (var i = 0; i < 6; i++) {
        var item = eventData[i];
        links1 += (i + 1);
        links1 += '. ';
        links1 += ('<a href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4006f6ce87392229&redirect_uri=http%3A%2F%2Fwonderjar.tunnel.mobi&response_type=code&scope=snsapi_userinfo&state=' + (i + 1) + '#wechat_redirect">' + item.name + '</a>');
        links1 += '\n\n'
      }
    }
    replyStr = links1;
  } else if ((message.MsgType === 'event') && (message.EventKey === 'bless2')) {
    if (!links2) {
      for (var i = 6; i < 12; i++) {
        var item = eventData[i];
        links2 += (i + 1);
        links2 += '. ';
        links2 += ('<a href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4006f6ce87392229&redirect_uri=http%3A%2F%2Fwonderjar.tunnel.mobi&response_type=code&scope=snsapi_userinfo&state=' + (i + 1) + '#wechat_redirect">' + item.name + '</a>');
        links2 += '\n\n'
      }
    }
    replyStr = links2;
  } else {
    replyStr = '虽然现在不懂你在说什么，但我以后可能会懂';
  }

  res.reply(replyStr);
}));

app.use('/', routes);


//Create test data
var env = process.env.NODE_ENV || 'development';
if (env === 'test') {
  var models = require('./models');
  models.sequelize.sync({
      force: true
    })
    .then(function() {
      models.Event.bulkCreate(eventData);
    });
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;