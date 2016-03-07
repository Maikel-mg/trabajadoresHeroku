var express = require('express');
var app = express();
var mongoose = require('mongoose');

app.set('port', (process.env.PORT || 5000));

app.use('/public', express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.send('Hello world from github');
});

app.get('/dbmongo' , function (req, res) {
  var db;
  try {
    db = mongoose.createConnection('mongodb://maikelmg:maikelmg@ds039321.mlab.com:39321/prueba');

    console.log('OK : connecting to Database. ');
    var userSchema = new mongoose.Schema({
      id: String,
      nombre: String
    });
    var User = mongoose.model('usuarios', userSchema);
    console.log('OK : queriying users. ');

    User.find({}, function(err, users) {
      if (err) return console.error(err);
      console.log('OK-POST : queriying users. ');
      res.json(users);
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
