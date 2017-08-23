var express = require('express');
var router = express.Router();
var config = require('../config.js');


router.post('/bot' + config.token, function(req, res, next) {
	bot.processUpdate(req.body);
	res.sendStatus(200);
	console.log(req.body);
});

router.get('/test', function(req, res, next) {
	res.send('ok');
	console.log('ok');
});
module.exports = router;
