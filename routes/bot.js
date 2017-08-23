var express = require('express');
var router = express.Router();
var config = require('../config.js');
const TOKEN = config.token;
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(TOKEN);

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

// Matches /love
bot.onText(/\/love/, function onLoveText(msg) {
  const opts = {
    reply_to_message_id: msg.message_id,
    reply_markup: JSON.stringify({
      keyboard: [
        ['Yes, you are the bot of my life ❤'],
        ['No, sorry there is another one...']
      ]
    })
  };
  bot.sendMessage(msg.chat.id, 'Do you love me?', opts);
});

bot.onText('/\/start/', function onLoveText(msg) {
  const opts = {
    reply_to_message_id: msg.message_id
  };
  bot.onReplyToMessage(msg.chat.id, msg.message_id, function (){
  	bot.sendMessage(msg.chat.id, 'Hola de nuevo!', opts);
  })
  bot.sendMessage(msg.chat.id, 'Hola!', opts);
});

module.exports = router;
