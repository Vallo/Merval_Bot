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

bot.onText(/\/start/, function onStartText(msg) {
  const opts = {
    reply_to_message_id: msg.message_id,
    reply_markup: {"force_reply": true}
  };
  bot.sendMessage(msg.chat.id, 'Hola!', opts).then(function(sended){
  	var chatId = sended.chat.id;
    var messageId = sended.message_id;
    bot.onReplyToMessage(chatId, messageId, function(message) {
        bot.sendMessage(chatId, "Lero lero");
    });
  });
});


bot.onText(/\/editable/, function onEditableText(msg) {
  const opts = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Edit Text',
             // we shall check for this value when we listen
             // for "callback_query"
            callback_data: 'edit'
          }
        ]
      ]
    }
  };
  bot.sendMessage(msg.from.id, 'Original Text', opts);
});


// Handle callback queries
bot.on('callback_query', function onCallbackQuery(callbackQuery) {
  const action = callbackQuery.data;
  const msg = callbackQuery.message;
  const opts = {
    chat_id: msg.chat.id,
    message_id: msg.message_id,
  };
  let text;

  if (action === 'edit') {
    text = 'Edited Text';
  }

  bot.editMessageText(text, opts);
});


module.exports = router;
