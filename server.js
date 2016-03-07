var express = require('express');
var app = express();
var mongoose = require('mongoose');

//var CatRoutes = require('./server/routes/cats.js');
//var Trabajador = require('./server/models/trabajador.js');
//var Cat = require('./server/models/cat.js');

var catSchema = mongoose.Schema({
  nombre: String,
  color : String
});


var db;

app.set('port', (process.env.PORT || 5000));
app.use('/public', express.static(__dirname + '/public'));

try {
  console.log('MONGOLAB_URI :: ' + process.env.MONGOLAB_URI);
  db = mongoose.createConnection(process.env.MONGOLAB_URI);

  console.log('OK : connecting to Database. ');
  app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
  });
} catch (e) {
  console.log('ERROR: connecting to Database. ' + e);
} finally {
  console.log('FINALLY: connecting to Database. ' );
}

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });


//app.use('v1/cats/', CatRoutes);

app.get('/', function (req, res) {
  res.send('Hello world from github ' + process.env.NODE_ENV);
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

app.get('/cats' , function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  try {
    var Cat = db.model('Cat', schema);

    Cat.find(function (err, docs) {
      if (err) {
      console.log('REEORmeow' + error);
      }
      res.json(docs);
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


app.get('/catsCount' , function (req, res) {

  try {
    var Cat = db.model('Cat', schema);


    Cat.count(function (err, count) {
      if (err) {
        console.log('REEORmeow' + error);
      }
      console.log('there are %d jungle adventures', count);
      res.send(count);
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



// app.listen(app.get('port'), function() {
//   console.log('Node app is running on port', app.get('port'));
// });
