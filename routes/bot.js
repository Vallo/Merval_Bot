var express = require('express');
var router = express.Router();
var config = require('../config');
/* GET users listing. */
router.post('/' + config.bot, function(req, res, next) {
  res.sendStatus(200);
  console.log(req.body)
});

router.get('/test', function(req, res, next) {
  res.send('/' + config.bot);
  
});

module.exports = router;
