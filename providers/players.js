var mongoose = require('mongoose');
var http = require('http');


//
// Mongoose Set Up
//

mongoose.connect('mongodb://localhost/fpl');
// TODO: Move schema to JSON file
var Player = mongoose.model('Player', {
  web_name: String
});


//
// Constants
//

var PLAYER_COUNT = 550;
var PLAYER_URL = "http://fantasy.premierleague.com/web/api/elements/";


//
// Players Module
//

function Players() {}
Players.prototype.consructor = function() {};

Players.prototype.fetchAll = function() {
  for(var i = 0; i < PLAYER_COUNT; i++) {
    this.fetchByID(i)
  }
};

Players.prototype.fetchByID = function(ID) {
  // TODO: Need to abstract this crap out
  http.get( PLAYER_URL + ID + "/"  , function(res) {
    var body = '';

    res.on('data', function(chunk) { 
      if( res.statusCode != 404 )  body += chunk; 
    });

    res.on('end', function() {
      if(!body.length) return console.log( PLAYER_URL + ID  , body.length   );
      var player = new Player( JSON.parse(body) );
      player.save( function(err) {
        if( err ) console.log(err);
        console.log("Player: ", player );
      });
    });

  }).on('error', function(e) {
    console.log("Got error: ", e);
  });
}


module.exports = new Players();
