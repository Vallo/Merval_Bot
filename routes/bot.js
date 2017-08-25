var express = require('express');
var router = express.Router();
var config = require('../config.js');
const TOKEN = config.token;
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(TOKEN);
const bitcoin = require('../domain/bitcoin.js');
const dolar = require('../domain/dolar.js');
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
/*
const opts = {
    reply_markup: {"force_reply": true}
  };
  .then(function(sended){
  	var chatId = sended.chat.id;
    var messageId = sended.message_id;
    bot.onReplyToMessage(chatId, messageId, function(message) {
        bot.sendMessage(chatId, "Lero lero");
    });
*/

bot.onText(/\/alertas/, function onStartText(msg) {
  //Obtener alertas activasdel usuario e imprimirlas
  bot.sendMessage(msg.chat.id, 'Sin implementar', opts)
});

bot.onText(/\/start/, function onStartText(msg) {
  bot.sendMessage(msg.chat.id, 'Hola ' + msg.from.first_name + '! Escribe /ayuda para más información', opts)
});

bot.onText(/\/bitcoin/, function onStartText(msg) {
  bot.sendMessage(msg.chat.id, 'Valor bitstamp: ' + bitcoin.lastPrice());
});
bot.onText(/\/dolar/, function onStartText(msg) {
  bot.sendMessage(msg.chat.id, dolar.lastPrice());
});

bot.onText(/\/ayuda/, function onStartText(msg) {
  bot.sendMessage(msg.chat.id, 'Escribe /bitcoin para saber la cotización de bitstamp. \n Proximamente precios Merval y alertas configurables en tiempo real.');
});

bot.onText(/\/about/, function onStartText(msg) {
  bot.sendMessage(msg.chat.id, 'Bot desarrollado por Matías Vallone. Contacto: vallo61@gmail.com');
});

module.exports = router;
