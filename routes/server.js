//server.js

module.exports = function(app){

  /* GET home page. */
  app.get('/', function(req, res, next) {
    res.send('gatitos', { title: 'Gatitos funciona' });
  });

  /* GET users listing. */
  app.post('/', function(req, res, next) {
    res.send('respond with a resource');
  });
}
