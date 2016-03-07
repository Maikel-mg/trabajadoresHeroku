var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var trabajadorSchema = Schema({
  nombre: String,
  puesto : String
});

module.exports = mongoose.model('Trabajador', trabajadorSchema);
