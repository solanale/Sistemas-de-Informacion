//server.js

module.exports = function(app){

  /* GET */
  app.get('/', function(req, res, next) {
    res.send('gatitos', { title: 'Gatitos funciona' });
  });

  /* POST */
  app.post('/', function(req, res, next) {
    res.send('respond with a resource');
  });
}
