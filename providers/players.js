var mongoose = require('mongoose');
var mongoosePolymorphic = require('mongoose-polymorphic');
var fplStat = require('./fpl.js');

//
// Constants
//

var PLAYER_COUNT = 550;


//
// Mongoose Set Up
//

mongoose.connect('mongodb://localhost/_fpl2');
var schemas = {
  player: require('../schemas/player.js'),
  stats:  require('../schemas/stats.js')
};

// 
// Models
// 

var PlayerSchema = new mongoose.Schema( schemas.player );
var Player =  mongoose.model('Player', PlayerSchema);

var StatSchema = new mongoose.Schema( schemas.stats );
var Stat = mongoose.model('Stat', StatSchema);


//
// Players Module
//

function Players() {}
Players.prototype.consructor = function() {};

Players.prototype.getAll = function(cb) {
  Player.find().sort('team_name').exec(cb);
};

Players.prototype.getByID = function(id, cb) {
  Player.findOne({ _id: id })
        .populate('stats')
        .exec(cb);
};

Players.prototype.fetchAll = function() {
  for(var i = 0; i < PLAYER_COUNT; i++) {
    this.fetchByID(i)
  }
};

Players.prototype.fetchByID = function(ID) {

  fplStat( ID, function(data) {
    var player = new Player( data  );
    player.save( function(err) {
      if( err ) console.log(err);
      console.log("Player: ", player );
    });
  });

};

Players.prototype.updatePlayerStats = function() {
  Player.find().sort('team_name').exec(function(err, players){
    players.forEach(function(player) {
      fplStat( player._id, function(data) {
        data._belongsTo =  player._id;
        delete data._id;
        var stat = new Stat( data );
        stat.save( function(err) {
          if( err ) console.log(err);
          console.log('stat saved:', stat);
          player.stats.push(stat);
          player.save(function(err){
            if( err ) console.log(err);
            console.log("Player stat: ", player.web_name );
          });
        });
      });
    });
  });
};



module.exports = new Players();
