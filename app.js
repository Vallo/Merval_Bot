const config = require('./config.js');
const TOKEN = config.token;
const url = 'https://' + config.Ip;
const port = 433;
const TelegramBot = require('node-telegram-bot-api');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var botRoute = require('./routes/bot');

//init bot
const bot = new TelegramBot(TOKEN);
bot.setWebHook(`${url}/${TOKEN}`);
console.log(`${url}/${TOKEN}`);


var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/bot', botRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('404');
});

module.exports = app;
