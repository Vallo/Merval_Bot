var CronJob = require('cron').CronJob;
var request = require('request');
var oficial;
var blue;
new CronJob('1 * * * * *', function() {
	CheckPrice();
}, null, true, 'America/Los_Angeles');

function CheckPrice(){
	request('http://ws.geeklab.com.ar/dolar/get-dolar-json.php', function (error, response, body) {
		try{
			var res = JSON.parse(body);
			oficial = res.libre;
			blue = res.blue;
		}
		catch(err){}
	});
}


exports.lastPrice = function(){
	return 'Oficial: ' + oficial + '/n Blue: ' + blue;
}