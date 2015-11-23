module.exports = function(app) {

    var User = require('./models/User');

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	// frontend routes =========================================================
	// route to handle all angular requests
	// req = requeriment (peticion)
	// res = response
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

//	app.post('/logIn', function(req,res){
//	    var model = json(req.body);
//	    var email = model["email"]; // identificador del cuadro de busqueda
//        var pass = model["pass"];
//        User.find({ email: email }, function(err, user) {
//           if (err) throw err;
//           // object of the user
//           console.log(user);
//           if (User.pass==pass) {
//               res.sendStatus(200);
//           }else{
//               res.sendStatus(400);
//           }
//        });
//	});
//
//    app.post('/signUp', function(req,res){
//        var newUser = new User();
//        var model = json(req.body);
//        newUser.name = model["email"]; // identificador del cuadro de busqueda
//        newUser.apellidos = model[apellidos];
//        newUser.pass = model["pass"];
//        newUser.repass = model["repass"];
//        if (!model["gender"]){
//            newUser.gender = false; //female
//        }else{
//            newUser.gender = true; //male
//        }
//        newUser.Info = model["info"];
//        //find{model_attribute: var}
//        User.find({ email: newUser.email }, function(err, user) {
//           if (err) throw err;
//           res.sendStatus(400);
//           if (user){
//               User.save(function(err, user_Saved) {
//                   if (err) throw err;
//                   // object of the user
//                   console.log(user_saved);
//                   res.sendStatus(200);
//               });
//           }
//        });
//
//    });
};