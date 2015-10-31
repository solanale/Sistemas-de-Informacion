//server.js

var express = require('express');
var router = express.Router();

module.exports = function(app){


  /* GET */
  router.get('/', function(req, res, next) {
    res.send('gatitos', { title: 'Gatitos funciona' });
  });

  /* POST */
  router.post('/', function(req, res, next) {
    res.send('respond with a resource');
  });

  app.use('/', router);
}
