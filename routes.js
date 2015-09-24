var express = require('express');
var router = express.Router();

var eventCtrl = require('./controller/event');

var API_BlessCtrl = require('./controller/api/bless');

router.get('/', eventCtrl.list);

router.post('/api/bless', API_BlessCtrl.create)

module.exports = router;
