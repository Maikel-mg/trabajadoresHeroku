var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var catSchema = Schema({
  nombre: String,
  color : String
});


module.exports = mongoose.model('Cat', catSchema);
