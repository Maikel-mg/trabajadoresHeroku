var express = require('express');
var app = express();
var mongoose = require('mongoose');

app.set('port', (process.env.PORT || 5000));

app.use('/public', express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.send('Hello world from github');
});

app.get('/db' , function (req, res) {
  mongoose.connect('mongodb://test:test@ds039321.mlab.com:39321/prueba', function(err, res) {
    if(err) {
      console.log('ERROR: connecting to Database. ' + err);
    }
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
