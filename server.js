var express = require('express');
var app = express();
var mongoose = require('mongoose');
var trabajadorSchema = new mongoose.Schema({
  id: String,
  nombre: String
});
var Trabajador = mongoose.model('trabajadores', trabajadorSchema);
var schema = mongoose.Schema({ name: 'string' });

var nuevo;
app.set('port', (process.env.PORT || 5000));

app.use('/public', express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.send('Hello world from github');
});

app.get('/dbmongo' , function (req, res) {
  var db;
  try {
    //db = mongoose.createConnection('mongodb://maikelmg:maikelmg@ds039321.mlab.com:39321/prueba');
    console.log('MONGOLAB_URI :: ' + process.env.MONGOLAB_URI);
    db = mongoose.createConnection(process.env.MONGOLAB_URI);

    console.log('OK : connecting to Database. ');
    console.log('OK : queriying users. ');


    var Cat = db.model('Cat', schema);

    var kitty = new Cat({ name: 'Zildjian' });
    kitty.save(function (err) {
      if (err) {
      console.log('REEORmeow' + error);
      }
      console.log('meow');
    });

  } catch (e) {
    console.log('ERROR: connecting to Database. ' + e);
  } finally {
    console.log('FINALLY: connecting to Database. ' );
  }

  // mongoose.connect('mongodb://test:test@ds039321.mlab.com:39321/prueba', function(err, res) {
  //   if(err) {
  //     console.log('ERROR: connecting to Database. ' + err);
  //   }
  // });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
