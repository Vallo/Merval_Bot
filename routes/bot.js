var express = require('express');
var router = express.Router();
var config = require('../config.js');
const TOKEN = config.token;
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(TOKEN);
const bitcoin = require('../domain/bitcoin.js');

router.post('/' + config.token, function(req, res, next) {
	try {
	    bot.processUpdate(req.body);
		res.sendStatus(200);
	} 
	catch (err) {
    // handle the error safely
    console.log(err)
	}
});

bot.onText(/\/start/, function onStartText(msg) {
  const opts = {
    reply_markup: {"force_reply": true}
  };
  bot.sendMessage(msg.chat.id, 'Hola!' + msg.from.first_name, opts).then(function(sended){
  	var chatId = sended.chat.id;
    var messageId = sended.message_id;
    bot.onReplyToMessage(chatId, messageId, function(message) {
        bot.sendMessage(chatId, "Lero lero");
    });
  });
});

bot.onText(/\/bitcoin/, function onStartText(msg) {
  bot.sendMessage(msg.chat.id, 'Ultima cotización: ' + bitcoin.price);
});

module.exports = router;
