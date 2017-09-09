const TOKEN = config.token;
const bot = new TelegramBot(TOKEN);
exports.Alert = function(chatId, price, asset){
	bot.sendMessage(chatId, 'ALERTA: ' + asset + ' cotizando ' + price);
}