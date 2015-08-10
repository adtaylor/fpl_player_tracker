var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


module.exports = {
  _id: Number,
  web_name: String,
  first_name: String,
  second_name: String,
  team_code: Number,
  type_name: String,
  team_name: String,
  stats : [{ type: Schema.Types.ObjectId, ref: 'Stat' }]
}
