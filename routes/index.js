var express = require('express');
var router = express.Router();
var players = require('../providers/players.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  players.fetchAll();
  res.render('index', { title: 'Express' });
});
router.get('/player/:id', function(req, res, next) {
  var player_id = req.param('id')
  res.render('index', { title: 'Express ' + player_id });
});


module.exports = router;
