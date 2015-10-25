//app.js
//server

//BASE SETUP

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var port = process.env.PORT || 8080;

var app = express();

//MONGODB

var db_link = 'mongodb://localhost:27017'
var db = mongoose.createConnection(db_link,function(error,res){
  if(error)
    throw error;
  console.log('Connected to Database');
})


// Models (tablas)

var products_schema = new mongoose.Schema({
  ID:             { type: Number, unique: true }, //Clave unica
  nombre:         { type: String },
});

var users_schema = new mongoose.Schema({
//  username
//  name
//  apellido
//  email
  carrito:        { type: Number,repeat: true }, //Array de IDs
});

//Cargar Modelos

var Products = db.model('Products', products_schema);
var Users = db.model('Users', users_schema);

// Express configuration (configuracion de la instacion)


//app.set('view engine', 'jade'); //No usaremos jade

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev')); //Crea un registro para dev, no necesario
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.static(path.join(__dirname, 'public'))); //No es necesario
app.use(express.static(__dirname + '/public')); //Si no encuentra algo lo buscas en public


//
// PETICIONES DE ERROR
//

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var server = require('./routes/server')(app); //para pasar la instancia al server

app.listen(port);
console.log("Magic happens on port: "+port);
