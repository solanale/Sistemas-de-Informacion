// server.js

// BASE SETUP
// ==============================================

var express 	= require('express');
var app     	= express();
var port    	= process.env.PORT || 8080;
var bodyParser  = require('body-parser');
var mongoose 	= require('mongoose');


// MONGODB
// ==============================================
var db_lnk = 'mongodb://localhost:27017/Amazop';
var db = mongoose.createConnection(db_lnk, function(err, res) {
    if(err)
		throw err;
    console.log('Connected to Database');
});

// Load models
var products_schema = mongoose.Schema({
    id:                 { type: Number, unique: true },
	nombre:     		{ type: String },
	categoria:			{ type: String },
	subtitulo:			{ type: String },
	descripcion:		{ type: String },
	precio:				{ type: Number },
	valoracion:			{ type: Number },
	ventas:				{ type: Number },
	imagen:  			{ type: String },
});
var users_schema = new mongoose.Schema({
	username:	  { type: String, unique: true },
	name_:     	  { type: String },
	apellido:     { type: String },
	gender:       { type: Boolean },
	email:        { type: String, unique: true },
	password:     { type: String },
    info:         { type: String },
    cesta:        { type: [Number] },
});

var user = db.model('user', users_schema);
var Product = db.model('product', products_schema);

//Configuracion de Express
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// POST
// ==============================================
app.post('/login', function(req, res){
	//User.findOne().where('username', req.body.username).exec(function(err, doc){
	user.findOne({'username' : req.body.username }).exec(function(err, doc){
	    console.log(req.body.username);
		console.log("LogIn");

		if(doc == null){
		    console.log("documento vacio");
		    //console.log(req.body);
			res.send(401);
		}else{
			if(doc.password == undefined){
			    console.log("pass indefinido");
				res.send(401);
			}else if(doc.password == req.body.pass){
			    console.log("correcto");
				res.send(200);
			}else{
			    console.log("que cojones"),
				res.send(401);
			}
		}
	});
});

app.post('/signup', function(req, res){
    console.log("SignUp");

	user.findOne({'username' : req.body.username }).exec(function(err, doc){
		if(doc != null){
			res.send(401);
		}else{
			user.findOne({'email' : req.body.email}).exec(function(err, doc){
				if(doc != null){
					res.send(401);
				}else{
					if((req.body.pass != undefined) && (req.body.pass == req.body.repass)){
						var Usuario = new user({
								username:	  req.body.username,
								name_:		  req.body.name,
								apellido:     req.body.surname,
								info:         req.body.info,
								email:        req.body.email,
                                gender:       req.body.gender,
								password:     req.body.pass
						});
						Usuario.save()
						res.send(200);
					}else{
						res.send(400);
					}
				}
			});
		}
	});
});

app.post('/datos', function(req, res){
	console.log(req.body);
	user.findOne().where('username', req.body.username).exec(function(err, doc){
		console.log(doc);
		if(doc == null){
			res.sendStatus(401);
		}else{
			res.json(doc);
			console.log("estoy enviando");
		}
	});
});
////////////////////////////////
app.post('/buscar', function(req, res){
	//User.findOne().where('username', req.body.username).exec(function(err, doc){
	console.log(req);
	Product.find({'id' : req.body.id }).exec(function(err, doc){
		console.log("Busqueda");
		console.log(doc);

		if(doc == null){
		    console.log("documento vacio");
		    //console.log(req.body);
			res.send(401);
		}else{
            console.log("correcto");
            res.send(200);
		}
	});
});
///////////////////////////

app.post('/Products', function(req, res){
	//Search on DB
	Products.find().exec(function(err, doc){
		if(doc == null){
			console.log("NO ENCONTRADO");
			res.sendStatus(401);
		}else{
			console.log("ENCONTRADO");
			console.log(doc);
			res.send(doc);
		}
	});
});


app.post('/modificarComentario', function(req, res){
	Product.findOne().where('_id', req.body._id).exec(function(err, doc){
		if(doc == null){
			res.sendStatus(401);
		}else{
			if(doc.usuario == undefined){
				res.sendStatus(401);
			}else if(doc.usuario == req.body.username){
				doc.titulo = req.body.titulo;
				doc.texto = req.body.texto;
				doc.ultimaModificacion = new Date();
				doc.save();
			}else{
				res.sendStatus(401);
			}
		}
	});

});

app.post('/deleteProduct', function(req, res){
	Product.findOne().where('_id', req.body._id).exec(function(err, doc){
		if(doc == null){
			res.sendStatus(401);
		}else{
			if(doc.usuario == undefined){
				res.sendStatus(401);
			}else if(doc.usuario == req.body.username){
				doc.remove();
			}else{
				res.sendStatus(401);
			}
		}
	});
});

app.post('/addComent', function(req, res, db){
	console.log(req.body.serie);
	//Save the new Product into db
	var Comentario = new Product({
		titulo: 	 req.body.titulo,
		imdbID:		 req.body.imdbID,
		usuario:	 req.body.usuario,
		texto:  	 req.body.texto,
		serie:		 req.body.serie,
	});
	Comentario.save();
});

app.post('/ProductsUser', function(req, res, db){
	id = req.body.username;

	//Search on DB
	Product.find().where('usuario', id).exec(function(err, doc){
		res.sendStatus(doc);
	});
});
app.post('/ProductsTime', function(req, res, db){
	var id = req.body.imdbID;
	var from = new Date(req.body.inicio);
	var to = new Date(req.body.fin);

	//Correción de las fechas (bug de ui-angular)
	to = to.getTime();
	to = to + (1 * 24 * 60 * 60 * 1000);
	to = new Date(to);
	console.log(from);
	//Search on DB
	Product.find({fecha: { $gte: from, $lt: to }, imdbID: id}).exec(function(err, doc){
		console.log(doc);
		res.send(doc);
	});
});
app.post('/borrarUser', function(req, res){
	User.findOne().where('username', req.body.username).exec(function(err, doc){
		if(doc == null){
			res.sendStatus(401);
		}else{
			if(doc.password == req.body.pass){
				doc.remove();
				res.sendStatus(200);
			}else{
				res.sendStatus(401);
			}
		}
	});
});
app.post('/cambiar/pass', function(req, res){
	User.findOne().where('username', req.body.username).exec(function(err, doc){
		if(doc == null){
			res.sendStatus(401);
		}else{
			if(doc.password == req.body.pass){
				doc.password = req.body.nPass;
				doc.save();
				res.sendStatus(200);
			}else{
				res.sendStatus(401);
			}
		}
	});
});
app.post('/cambiar/email', function(req, res){
	User.findOne().where('username', req.body.username).exec(function(err, doc){
		if(doc == null){
			res.sendStatus(401);
		}else{
			if(doc.password == req.body.pass){
				doc.email = req.body.email;
				doc.save();
				res.sendStatus(200);
			}else{
				res.sendStatus(401);
			}
		}
	});
});
app.post('/cambiar/apellidos', function(req, res){
	User.findOne().where('username', req.body.username).exec(function(err, doc){
		if(doc == null){
			res.sendStatus(401);
		}else{
			if(doc.password == req.body.pass){
				doc.apellido = req.body.apellido;
				doc.save();
				res.sendStatus(200);
			}else{
				res.sendStatus(401);
			}
		}
	});
});
app.post('/cambiar/nombre', function(req, res){
	User.findOne().where('username', req.body.username).exec(function(err, doc){
		if(doc == null){
			res.sendStatus(401);
		}else{
			if(doc.password == req.body.pass){
				doc.name_ = req.body.name_;
				doc.save();
				res.sendStatus(200);
			}else{
				res.sendStatus(401);
			}
		}
	});
});
app.post('/add/cesta', function(usr, prod, res){
	User.findOne().where('username', usr.body.username).exec(function(err, doc){
		if(doc == null){
			res.sendStatus(401);
		}else{
			if(doc.password == usr.body.pass){
				doc.cesta.addToSet(prod._id);
				doc.save();
				res.sendStatus(200);
			}else{
				res.sendStatus(401);
			}
		}
	});
});

// ============================================= //

app.use(express.static(__dirname + '/public')); //Si no encuentras algo, estara en Public

// START THE SERVER
// ==============================================
app.listen(port); //app.listen(port,host); Lanzamos el server con un host, deberia funcionar en red local!!
console.log('Magic happens on port ' + port);
