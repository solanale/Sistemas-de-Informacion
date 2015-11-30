var app = angular.module('app-web', ['ngRoute', 'ngCookies', 'ui.bootstrap']);

//Constantes
var addr = "http://localhost:8080";
var views = "views/";
var Busqueda = "";

app.config(function($routeProvider){
	$routeProvider
		.when("/", {
			templateUrl: views + "home.html",
			controller: "HomeController"
		})

        .when("/log", {
            templateUrl: views + "logIn.html",
            controller: "LogInController"
        })
        .when("/sign", {
            templateUrl: views + "signUp.html",
            controller: "SignUpController"
        })

        .when("/perfil", {
            templateUrl: views + "perfil.html",
            controller: "PerfilController"
        })
        .when("/buscar", {
            templateUrl: views + "buscar.html",
            controller: "BuscarController"
        })

        .when("/comparar", {
            templateUrl: views + "comparar.html",
            controller: "CompararController"
        })

        .when("/cesta", {
            templateUrl: views + "cesta.html",
            controller: "CestaController",
        })

        .when("/cesta", {
			templateUrl: views + "cesta.html",
			controller: "CestaController",
		})

        .when("/elements", {
            templateUrl: views + "elements.html"
        })

		.when("/series/:id", {
			templateUrl: views + "partialseries.html",
			controller: "ControladorSeries"
		})
		.when("/resultado/:serieID", {
			templateUrl: views + "partialseriesresult.html",
			controller: "ControladorResults"
		})
		.when("/opciones", {
			templateUrl: views + "partialopciones.html",
			controller: "ControladorOpciones"
		})
		.when("/comentarios", {
			templateUrl: views + "partialcomentarios.html",
			controller: "ControladorComentarios"
		})
		.otherwise({ redirectTo: "/" });
});

app.controller("IndexController", ['$scope', "$cookies", '$cookieStore','$location', function($scope, $cookies, $cookieStore,$location){
	var user = $cookies.username;
	$scope.user = {'username': user};


	//Función que comprueba si un usuario esta logead
	$scope.notLogged = function() {
        return angular.isUndefined($cookies.username);
    };

    //Deslogeamos al usuario
    $scope.logOut = function(){
		delete $cookies["username"];
	};

	$scope.Buscar= function(){
	    Busqueda = $scope.busqueda;
	    $location.path("/buscar");
	    console.log(Busqueda);
	};
}]);

app.controller("HomeController", ['$scope', '$http', function($scope, $http){
	$scope.products = {};
	$scope.categorias = {};

    $http.post(addr + '/categorias')
        .success(function (data) {
            $scope.categorias = data;
        })
        .error(function (){
            alert("No hay categorias en la base de datos");
        });

	$http.post(addr + '/products')
		.success(function (data) {
			$scope.products = data;
		})
		.error(function (){
			alert("No hay productos en la base de datos");
		});
}]);

app.controller("CestaController", ['$scope','$http', "$cookies", '$cookieStore', function($scope, $http, $cookies, $cookieStore){

    $scope.add = function (p) {
        var envio = {};
        envio.username = $cookieStore.username;
        envio.product = p;
        $http.post(addr + '/addCesta', envio)
            .success(function () {
                alert("Producto añadido a su cesta");
            })
            .error(function (){
                alert("El producto no pudo añadirse");
            })
    }
}]);

app.controller("LogInController", ['$scope','$http', "$cookies", "$cookieStore", "$location", function($scope, $http, $cookies, $cookieStore,
$location){
    $scope.form = {};

    $scope.login = function(login){
        if($scope.form.username && $scope.form.pass){
            $http.post(addr + '/login', login)
                .success(function (data) {
                    $cookies.username = login.username;
                    $location.path("/");
                })
                .error(function (data){
                    alert("Username o contraseña incorrecta");
                });
        }
    };

}]);

app.controller("SignUpController", ['$scope','$http','$cookies',"$location", function($scope, $http, $cookies, $cookieStore,$location){

    $scope.user = {};
//    $scope.status=true;

	$scope.update = function(user){
        if (user.pass == user.repass){
            if (user.male != null){
                user.gender=true;
            }else{
                user.gender=false;
            }
            $http.post(addr + "/signup", user)
                .success(function (data){
                    $cookies.username = user.username;
                    alert("Usuario " + $cookies.username + " registrado con exito.");
                    $location.path("/");
                })
                .error(function (data){
                    alert("Nombre o email ya registrado.");
                });
        }else{
            alert("Las contraseñas no coinciden");
        }
    };
}]);

app.controller("PerfilController",['$scope','$http', '$cookies',function($scope, $http, $cookies){
	var send = {username: $cookies.username};
	$scope.info = {};

	//Receive data comments
	$http.post(addr + "/datos", send)
		.success(function(data){
			$scope.info = data;
		});
}]);

app.controller("BuscarController", ['$scope', "$cookies", '$cookieStore','$http', function($scope, $cookies, $cookieStore,$http){
	$scope.product= {};
	$scope.result = {};
	$scope.product.id = Busqueda;

    $http.post(addr+'/buscar', $scope.product).success(function (data) {
         console.log(data);
         $scope.result = data;
     });
}]);

app.controller("CompararController", ['$scope', "$cookies", '$cookieStore', '$http', function($scope, $cookies, $cookieStore, $http){

    $scope.product1 = {};
    $scope.product2 = {};
    $scope.noSearch1 = true;
    $scope.noSearch2 = true;

    $scope.Buscar1 = function() {
        $scope.product1.id = $scope.busqueda1;
        console.log($scope.product1);
        $http.post(addr + '/comparar', $scope.product1)
        .success(function(data){
            console.log(data);
            $scope.noSearch1 = false;
            $scope.result1 = data;
        })
        .error(function(data){
            alert("El producto no pudo encontrarse");
        })
        };

        $scope.Buscar2 = function() {
            $scope.product2.id = $scope.busqueda2;
            console.log($scope.product2);
            $http.post(addr + '/comparar', $scope.product2)
            .success(function(data){
                console.log(data);
                $scope.noSearch2 = false;
                $scope.result2 = data;
            })
            .error(function(data){
                alert("El producto no pudo encontrarse");
            })
            };

}]);

//app.controller("ControladorOpciones", ['$scope','$http', "$cookies", "$cookieStore", "$location", function($scope, $http, $cookies, $cookieStore,
//$location){
//	//Borrar cuenta
//	$scope.delete_ = function (data){
//		if(angular.isUndefined($cookies.username)){
//			alert("Eh eh, usted no puede hacer esto");
//		}else{
//			data_send = {};
//			data_send.username = $cookies.username;
//			data_send.pass = data.pass;
//			$http.post(addr + '/borrarUser', data_send)
//				.success(function (data) {
//					alert("Cuenta  borrada");
//					delete $cookies["username"];
//					$location.path("/index");
//				})
//				.error(function (data){
//					alert("Contraseña incorrecta");
//				});
//		}
//	};
//
//	//Cambiar contraseña
//	$scope.pass = function (data){
//		if(angular.isUndefined($cookies.username)){
//			alert("Eh eh, usted no puede hacer esto");
//		}else{
//			if(data.pass_1 == data.pass_2){
//				data_send = {};
//				data_send.username = $cookies.username;
//				data_send.pass = data.pass_old;
//				data_send.nPass = data.pass_1;
//				$http.post(addr + '/cambiar/pass', data_send)
//					.success(function (data) {
//						alert("Datos cambiados");
//					})
//					.error(function (data){
//						alert("Contraseña incorrecta");
//					});
//			}else{
//				alert("Las contraseñas no coinciden.");
//			}
//		}
//	};
//
//	//Cambiar email
//	$scope.email = function (data){
//		if(angular.isUndefined($cookies.username)){
//			alert("Eh eh, usted no puede hacer esto");
//		}else{
//			data_send = {};
//			data_send.username = $cookies.username;
//			data_send.pass = data.pass;
//			data_send.email = data.email;
//			$http.post(addr + '/cambiar/email', data_send)
//				.success(function (data) {
//					alert("Datos cambiados");
//				})
//				.error(function (data){
//					alert("Contraseña incorrecta");
//				});
//		}
//	};
//
//	//Cambiar direccion
//	$scope.direccion = function (data){
//		if(angular.isUndefined($cookies.username)){
//			alert("Eh eh, usted no puede hacer esto");
//		}else{
//			data_send = {};
//			data_send.username = $cookies.username;
//			data_send.pass = data.pass;
//			data_send.direccion = data.direccion;
//			$http.post(addr + '/cambiar/direccion', data_send)
//				.success(function (data) {
//					alert("Datos cambiados");
//				})
//				.error(function (data){
//					alert("Contraseña incorrecta");
//				});
//		}
//	};
//
//	//Cambiar tlf
//	$scope.tlf = function (data){
//		data_send = {};
//		data_send.username = $cookies.username;
//		data_send.pass = data.pass;
//		data_send.tlf = data.tlf;
//		if(angular.isUndefined($cookies.username)){
//			alert("Eh eh, usted no puede hacer esto");
//		}else{
//			$http.post(addr + '/cambiar/tlf', data_send)
//				.success(function (data) {
//					alert("Datos cambiados");
//				})
//				.error(function (data){
//					alert("Contraseña incorrecta");
//				});
//		}
//	};
//
//	//Cambiar apellido
//	$scope.apellido = function (data){
//		if(angular.isUndefined($cookies.username)){
//			alert("Eh eh, usted no puede hacer esto");
//		}else{
//			data_send = {};
//			data_send.username = $cookies.username;
//			data_send.pass = data.pass;
//			data_send.apellido = data.apellido;
//			$http.post(addr + '/cambiar/apellidos', data_send)
//				.success(function (data) {
//					alert("Datos cambiados");
//				})
//				.error(function (data){
//					alert("Contraseña incorrecta");
//				});
//		}
//	};
//
//	//Cambiar nombre
//	$scope.nombre = function (data){
//		if(angular.isUndefined($cookies.username)){
//			alert("Eh eh, usted no puede hacer esto");
//		}else{
//			data_send = {};
//			data_send.username = $cookies.username;
//			data_send.pass = data.pass;
//			data_send.name_ = data.name;
//			$http.post(addr + '/cambiar/nombre', data_send)
//				.success(function (data) {
//					alert("Datos cambiados");
//				})
//				.error(function (data){
//					alert("Contraseña incorrecta");
//				});
//		}
//	};
//}]);

//
//app.controller("ControladorSeries", ['$scope','$http','$routeParams', function($scope, $http, $routeParams){
//	var title = $routeParams.id;
//	var dummySeries = '';
//	//Función para concatenar elementos
//    $.concat||$.extend({concat:function(b,c){var a=[];for(x in arguments)a=a.concat(arguments[x]);return a}});
//
//    console.log(title);
//    $http.get('http://www.omdbapi.com/?s=' + title).success(function (data) {
//		if(data.Response == "False"){
//			alert("No se encuentran series o peliculas con ese nombre");
//		}else{
//			dummySeries = data.Search;
//			//Obtenemos el primer elemento
//			$scope.aux = dummySeries[0];
//			$http.get('http://www.omdbapi.com/?i=' + $scope.aux.imdbID).success(function (dataOne){
//				$scope.series = (dataOne);
//			});
//			//Obtenemos el resto de elementos
//			for(var i = 1; i<dummySeries.length;i++){
//				$scope.aux = dummySeries[i];
//				$http.get('http://www.omdbapi.com/?i=' + $scope.aux.imdbID).success(function (dataOne) {
//					$scope.series = $.concat($scope.series, dataOne);
//				});
//			}
//		}
//     });
//}]);
//
//app.controller("ControladorComentarios",['$scope','$http','$routeParams', '$route', '$cookies',function($scope, $http, $routeParams, $route, $cookies){
//	sendForComment = { username: $cookies.username };
//
//	$scope.comment = {};
//	//Receive data comments
//	$http.post(addr + "/commentsUser", sendForComment)
//		.success(function(data){
//			$scope.comment = data;
//			console.log(data);
//		})
//
//	console.log($scope.comentarios);
//	//Borrar un comentario
//	$scope.deleteComment = function(comment){
//		if($cookies.username == comment.usuario){
//			var r = confirm("Seguro que desea borrar este comentario.");
//			if ( r == true){
//				comment.username = $cookies.username;
//				$http.post(addr + "/deleteComment", comment)
//				$route.reload();
//			}
//		}else{
//			alert("NO PUEDES BORRAR ESTE COMENTARIO");
//		}
//	};
//
//	//Mostrar edicion
//	$scope.modificarComentario = function(modificado, original){
//		if($cookies.username == undefined){
//			alert("Yo te dejaria modificarlo... pero antes registrate.");
//		}else if($cookies.username == original.usuario){
//			modificado.username = $cookies.username;
//			modificado._id = original._id;
//			$http.post(addr + "/modificarComentario", modificado)
//			$route.reload();
//		}else{
//			alert("Yo te dejaria modificarlo... pero mi jefe dice que no.");
//		}
//	};
//
//	//Muestras las opciones del comentario si pertenece al usuario
//	$scope.modifyComment = function(infoComment){
//		if(angular.isUndefined($cookies.username)){
//			return false;
//		}else{
//			return $cookies.username == infoComment.usuario;
//		}
//	};
//
//	//Muestra los comentarios u otro elemento
//	$scope.hayCom = function (){
//		console.log('a' + $scope.comment.length);
//		if($scope.comment.length > 0){
//			return true;
//		}else{
//			return false;
//		}
//	};
//}]);
//
//app.controller("ControladorResults",['$scope','$http','$routeParams', '$route', '$cookies',function($scope, $http, $routeParams, $route, $cookies){
//	console.log(angular.isUndefined($cookies.username));
//	//Get information from omdbapi
//	var imdbID =  $routeParams.serieID;
//	$scope.serieID = imdbID;
//	$scope.seres = {};
//
//	$http.get('http://www.omdbapi.com/?i=' + imdbID +"&plot=full").success(function (data) {
//		$scope.series = data;
//	});
//
//
//	//Tabs;
//	$scope.tab = 1;
//    $scope.selectTab = function (setTab){
//		$scope.tab = setTab;
//   	};
//   	$scope.isSelected = function(checkTab) {
//		return $scope.tab === checkTab;
//    };
//
//	sendForComment = { imdbID: $routeParams.serieID };
//
//	//Receive data comments
//	$http.post(addr + "/comments", sendForComment)
//		.success(function(data){
//			$scope.comment = data;
//			console.log(data);
//		})
//
//	//Send Comment
//	$scope.agregarComentario= function(newComment){
//		$scope.newComment.usuario = $cookies.username; //Pillar usuario registrado o undefinided en otro caso.
//		$scope.newComment.imdbID = imdbID;
//		$scope.newComment.serie = $scope.series.Title;
//
//		console.log($scope.newComment);
//
//		//Send data comment
//		$http.post(addr + "/addComent", newComment)
//			.success(function (newComment){
//			}
//		)
//		$route.reload();
//	}
//
//	//Borrar un comentario
//	$scope.deleteComment = function(comment){
//		if($cookies.username == comment.usuario){
//			var r = confirm("Seguro que desea borrar este comentario.");
//			if ( r == true){
//				comment.username = $cookies.username;
//				$http.post(addr + "/deleteComment", comment)
//				$route.reload();
//			}
//		}else{
//			alert("NO PUEDES BORRAR ESTE COMENTARIO");
//		}
//	}
//
//	//Mostrar edicion
//	$scope.modificarComentario = function(modificado, original){
//		console.log($cookies.username);
//		if($cookies.username == undefined){
//			alert("Yo te dejaria modificarlo... pero antes registrate.");
//		}else if($cookies.username == original.usuario){
//			modificado.username = $cookies.username;
//			modificado._id = original._id;
//			$http.post(addr + "/modificarComentario", modificado)
//			$route.reload();
//		}else{
//			alert("Yo te dejaria modificarlo... pero mi jefe dice que no.");
//		}
//	}
//
//	//Muestras las opciones del comentario si pertenece al usuario
//	$scope.modifyComment = function(infoComment){
//		if(angular.isUndefined($cookies.username)){
//			return false;
//		}else{
//			return $cookies.username == infoComment.usuario;
//		}
//	}
//
//	//Fecha máxima 1
//	$scope.toggleMax_1 = function() {
//		$scope.maxDate_1 = new Date();
//	};
//	$scope.toggleMax_1();
//
//	//Abrir primer calendario
//	$scope.open_1 = function($event) {
//		$event.preventDefault();
//		$event.stopPropagation();
//
//		$scope.opened_1 = true;
//	};
//
//	//Abrir segundo calendario
//	$scope.open_2 = function($event) {
//		$event.preventDefault();
//		$event.stopPropagation();
//
//		$scope.opened_2 = true;
//	};
//
//	$scope.dateOptions = {
//		formatYear: 'yy',
//		startingDay: 1
//	};
//
//	//Comentarios en una fecha
//	$scope.mostrarComentarios = function (){
//		if(angular.isUndefined($scope.dt_2) || angular.isUndefined($scope.dt_1)){
//			alert("Los campos de fecha no pueden ser nulos");
//		}
//		else{
//			if ($scope.dt_2 < $scope.dt_1){
//				alert("Desde un punto de vista ni lineal ni subjetivo, el tiempo es como una gran pelota que se bambolea y tratabillea... Pero la gente asume que el tiempo es una sucesion estricta de causa y efecto, así que pon fechas coherentes");
//			}
//			else{
//				sendForComment = { imdbID: $routeParams.serieID,
//								   inicio: $scope.dt_1,
//								   fin: $scope.dt_2 };
//				$http.post(addr + "/commentsTime", sendForComment)
//					.success(function(data){
//						$scope.comment = data;
//						console.log(data);
//					})
//			}
//		}
//	};
//	$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
//	$scope.format = $scope.formats[0];
//
//	//Ver todos los comentarios
//	$scope.mostrarTodosComentarios = function (){
//		$http.post(addr + "/comments", sendForComment)
//		.success(function(data){
//			$scope.comment = data;
//			console.log(data);
//		})
//	};
//}]);
//


//
//
