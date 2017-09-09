var redis = require("promise-redis")();
var client = redis.createClient();
var db = require("./db");
var alertSender = require("./alertSender.js");


exports.AddAlert = function(asset, price, chatId, direction){
	var alert = {};
	alert.price = price;
	alert.direction = direction; //true = up
	var alertId = db.Insert(alert);
	client.set("Alert:" + alertId,JSON.stringify(alert));
	client.sadd("Asset:" + asset, chatId);
	client.sadd("ChatId:" + chatId, AlertId);
}


exports.CheckAlerts = function(asset, price){
	client.smembers("Asset:" + asset).then(function(res){ //get all ChatId in Asset
		for(var i in res){
			var chatId = res[i];
			client.smembers("ChatId:" + chatId).then(function(res){ //get Alerts for ChatId
				for(var i in res){
					alertId = res[i];
					client.get("user:" + res[i]).then(function(res){ //get trigger price for that alert
						var value = JSON.parse(res);
						if ((value.direction && value.price > price) || (!value.direction && value.price < price))//alert
						{
							CloseAlert(alertId, chatId, asset);
							alertSender.Alert(chatId, asset, price);
						}
					});
				}
			});
		}
	});
}

function CloseAlert(alertId, chatId, asset){
	//client.srem("Asset:" + asset, chatId); //todo delete only when size = 0
	client.srem("ChatId:" + chatId, alertId);
	client.del("Alert:" + alertId);
	db.Remove(alertId);
}