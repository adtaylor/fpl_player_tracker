var express = require('express');
var router = express.Router();
var Players = require('../providers/players.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  Players.getAll(function(err, players) {
    console.log(players);
    res.render('index', { title: 'All Players', players: players  });
  });
});

router.get('/player/update', function(req, res, next) {
  Players.fetchAll();
  res.render('index', { title: 'Fetch All' });
});

router.get('/player/update/stats', function(req, res, next) {
  Players.updatePlayerStats();
  res.send( 'Fetch Stats' );
});

router.get('/player/:id', function(req, res, next) {
  var player_id = req.param('id')
  Players.getByID( player_id, function(err, player) {
    console.log(err);
    res.render('player', { title: 'player', player: player });
  })
});


module.exports = router;
