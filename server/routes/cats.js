var Cat = require('./../models/cat.js');
var express = require('express');
var router = express.Router;

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Cat Time: ', Date.now());
  next();
});

router.get('/', function(req, res) {
  res.send('Cats home page ');
});

router.get('/all', function(req, res) {
  res.send('Get all Cats');
});

module.exports = router;
