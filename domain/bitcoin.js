var Bitstamp = require('bitstamp-ws');

var price;
var ws = new Bitstamp();
ws.on('trade', function(trade) {
  price = trade.price;
});
console.log('Bitcoin monitor iniciado');

exports.lastPrice = function(){
	return price;
}