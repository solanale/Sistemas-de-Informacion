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
var product_schema = mongoose.Schema({
	nombre:     		{ type: String },
	descripcion:		{ type: String },
	serie:				{ type: String },
	usuario:		    { type: String },
	texto:  			{ type: String },
	fecha:  			{ type: Date, default: Date() },
	ultimaModificacion:	{ type: Date, default: Date() },
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

var User = db.model('users', users_schema);
var Comment = db.model('comments', comment_schema);

//Configuracion de Express
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// POST
// ==============================================
app.post('/modificarComentario', function(req, res){
	Comment.findOne().where('_id', req.body._id).exec(function(err, doc){
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
app.post('/login', function(req, res){
	User.findOne().where('username', req.body.username).exec(function(err, doc){
		console.log("LogIn")
		if(doc == null){
			res.sendStatus(401);
		}else{
			if(doc.password == undefined){
				res.sendStatus(401);
			}else if(doc.password == req.body.pass){
				res.sendStatus(200);
			}else{
				res.sendStatus(401);
			}
		}
	});
});

app.post('/deleteComment', function(req, res){
	Comment.findOne().where('_id', req.body._id).exec(function(err, doc){
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

app.post('/signup', function(req, res){
    console.log("SignUp");
	User.find().where('username', req.body.username).exec(function(err, doc){
		if(doc.length > 0){
			res.sendStatus(401);
		}else{
			User.find().where('email', req.body.email).exec(function(err, doc){
				if(doc.length > 0){
					res.sendStatus(401);
				}else{
					if((req.body.pass != undefined) && (req.body.pass == req.body.repass)){
						var Usuario = new User({
								username:	  req.body.username,
								name_:		  req.body.name_,
								apellido:     req.body.surname,
								info:         req.body.info,
								email:        req.body.email,
                                gender:       req.body.gender.male,
								password:     req.body.pass
						});
						Usuario.save()
						res.sendStatus(200);
					}else{
						res.sendStatus(400);
					}
				}
			});
		}
	});
});

app.post('/addComent', function(req, res, db){
	console.log(req.body.serie);
	//Save the new comment into db
	var Comentario = new Comment({
		titulo: 	 req.body.titulo,
		imdbID:		 req.body.imdbID,
		usuario:	 req.body.usuario,
		texto:  	 req.body.texto,
		serie:		 req.body.serie,
	});
	Comentario.save();
});
app.post('/comments', function(req, res, db){
	id = req.body.imdbID;

	//Search on DB
	Comment.find().where('imdbID', id).exec(function(err, doc){
		res.sendStatus(doc);
	});
});
app.post('/commentsUser', function(req, res, db){
	id = req.body.username;

	//Search on DB
	Comment.find().where('usuario', id).exec(function(err, doc){
		res.sendStatus(doc);
	});
});
app.post('/commentsTime', function(req, res, db){
	var id = req.body.imdbID;
	var from = new Date(req.body.inicio);
	var to = new Date(req.body.fin);

	//Correción de las fechas (bug de ui-angular)
	to = to.getTime();
	to = to + (1 * 24 * 60 * 60 * 1000);
	to = new Date(to);
	console.log(from);
	//Search on DB
	Comment.find({fecha: { $gte: from, $lt: to }, imdbID: id}).exec(function(err, doc){
		console.log(doc);
		res.sendStatus(doc);
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
				doc.cesta.addToSet(prod);
				doc.save();
				res.sendStatus(200);
			}else{
				res.sendStatus(401);
			}
		}
	});
});
app.post('/datos', function(req, res){
	User.findOne().where('username', req.body.username).exec(function(err, doc){
		if(doc == null){
			res.sendStatus(401);
		}else{
			res.sendStatus(doc);
		}
	});
});
// ============================================= //

app.use(express.static(__dirname + '/public')); //Si no encuentras algo, estara en Public

// START THE SERVER
// ==============================================
app.listen(port); //app.listen(port,host); Lanzamos el server con un host, deberia funcionar en red local!!
console.log('Magic happens on port ' + port);
