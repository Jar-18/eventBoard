
var blessService = require('../../service/bless');

exports.create = function(req, res, next) {
    
    blessService.create(req.body)
        .then(function(bless) {
            res.status(201)
                .json(bless);
        });

}