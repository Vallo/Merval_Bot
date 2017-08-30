var Bitstamp = require('bitstamp-ws');

var redis = require("redis"), client = redis.createClient();
var bluebird = require("bluebird");
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
var price;
var ws = new Bitstamp();
ws.on('trade', function(trade) {
  price = trade.price;
  CheckAlerts();
});

function CheckAlerts(){
	client.get("Alerta:Bitstamp:*").then(function(res){
		var json = JSON.parse(res);

	});
}
console.log('Bitcoin monitor iniciado');

exports.lastPrice = function(){
	return price;
}