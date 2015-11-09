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
  ID:             { type: Number, require:true, unique: true }, //Clave unica
  nombre:         { type: String, require:true },
  categoría:      { type: String, require:true },
});

var users_schema = new mongoose.Schema({
  username        { type: String, require:true, unique: true },
  password        { type: String, require:true },
  nombre:         { type: String, require:true },
  apellidos:      { type: String },
  email:          { type: String, require:true },
  carrito:        { type: Number,repeat: true }, //Array de Ids
});

//Cargar Modelos

var Products = db.model('Products', products_schema);
var Users = db.model('Users', users_schema);

// Express configuration (configuracion de la instacion)



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Añadimos la raiz donde buscara los los ficheros
app.use(express.static(__dirname + '/public')); //Si no encuentra algo lo buscas en public

var server = require('./routes/server')(app); //para pasar la instancia al server

app.listen(port);
console.log("Magic happens on port: "+port);
