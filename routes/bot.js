var express = require('express');
var router = express.Router();
var config = require('../config');
/* GET users listing. */
router.post('/' + config.bot, function(req, res, next) {
  res.sendStatus(200);
  console.log(req.body)
});


module.exports = router;
