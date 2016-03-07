var express = require('express');
var app = express();
var mongoose = require('mongoose');
var pg = require('pg');

app.set('port', (process.env.PORT || 5000));

app.use('/public', express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.send('Hello world from github');
});

app.get('/dbmongo' , function (req, res) {
  var db;
  try {
    db = mongoose.createConnection('mongodb://user:pass@localhost:port/database');
    console.log('OK : connecting to Database. ');
  } catch (e) {
    console.log('ERROR: connecting to Database. ' + e);
  } finally {
  node   console.log('FINALLY: connecting to Database. ' );
  }

  // mongoose.connect('mongodb://test:test@ds039321.mlab.com:39321/prueba', function(err, res) {
  //   if(err) {
  //     console.log('ERROR: connecting to Database. ' + err);
  //   }
  // });
});

app.get('/dbpg' , function (req, res) {
  var db;
  try {
    pg.defaults.ssl = true;
    pg.connect(process.env.DATABASE_URL, function(err, client) {
    if (err) throw err;
    console.log('Connected to postgres! Getting schemas...');

    client
      .query('SELECT table_schema,table_name FROM information_schema.tables;')
      .on('row', function(row) {
        console.log(JSON.stringify(row));
      });
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
