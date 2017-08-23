var express = require('express');
var router = express.Router();
var config = require('../config.js');


router.post('/bot' + config.token, function(req, res, next) {
	bot.processUpdate(req.body);
	res.sendStatus(200);
	console.log(req.body);
});

module.exports = router;
