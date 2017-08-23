var express = require('express');
var router = express.Router();
var config = require('../config.js');
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(TOKEN);

router.post('/' + config.token, function(req, res, next) {
	try {
	    bot.processUpdate(req.body);
		res.sendStatus(200);
		console.log(req.body);
	} 
	catch (err) {
    // handle the error safely
    console.log(err)
	}
});

router.get('/test', function(req, res, next) {
	res.send('ok');
	console.log('ok');
});
module.exports = router;
