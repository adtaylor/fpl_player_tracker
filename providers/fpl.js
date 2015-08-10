var http = require('http');

//
// Constants
//

var PLAYER_URL = "http://fantasy.premierleague.com/web/api/elements/";

//
// Modules
//

var fplStat = function( ID, cb ) {

  http.get( PLAYER_URL + ID + "/"  , function(res) {
    var body = '';

    res.on('data', function(chunk) { 
      if( res.statusCode != 404 )  body += chunk; 
    });

    res.on('end', function() {
      if(!body.length) return console.log( PLAYER_URL + ID  , body.length   );
      var data = JSON.parse(body);
      data._id = data.id;
      cb( data );
    });

  }).on('error', function(e) {
    console.log("Got error: ", e);
  });

}

module.exports = fplStat;
