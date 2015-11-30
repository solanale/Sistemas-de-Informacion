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
            controller: "MuestraCestaController",
        })

        .when("/elements", {
            templateUrl: views + "elements.html"
        })
		.otherwise({ redirectTo: "/" });
});

app.controller("IndexController", ['$scope','$route',"$cookies", '$cookieStore','$location', function($scope,$route, $cookies,$cookieStore,$location){
	$scope.user = {};
	$scope.user.username = $cookies.get('username');
	$route.reload();


	//Función que comprueba si un usuario esta logead
	$scope.notLogged = function() {
        return angular.isUndefined($scope.user.username);
    };

    //Deslogeamos al usuario
    $scope.logOut = function(){
		$cookies.remove("username");
		$scope.user.username= undefined;
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
    $scope.envio = {};

    $scope.add = function (p) {
        $scope.envio.username = $cookies.get('username');
        $scope.envio.product = p.id;
        $http.post(addr + '/addCesta', $scope.envio)
            .success(function () {
                alert("NOMBRE: "+$cookies.get('username')+", PRODUCTO: "+p.id+"\nProducto añadido a su cesta");
            })
            .error(function (){
                alert("El producto no pudo añadirse");
            })
    }
}]);

app.controller("MuestraCestaController", ['$scope','$http', '$cookies', '$cookieStore', function($scope, $http, $cookies, $cookieStore){

    $scope.cesta = {};
    $scope.user = {};
    $scope.user.username = $cookies.get("username");

    $http.post(addr + '/muestraCesta', $scope.user)
        .success(function (data) {
            $scope.cesta = data;
        })
        .error(function (){
            alert("Debe hacer login para cargar su cesta");
        })
}]);

app.controller("LogInController", ['$scope','$window','$http', "$cookies", "$cookieStore", "$location", function($scope,$window, $http, $cookies, $cookieStore,
$location){
    $scope.form = {};

    $scope.login = function(login){
        if($scope.form.username && $scope.form.pass){
            $http.post(addr + '/login', login)
                .success(function (data) {
                    $cookies.put('username',login.username);
                    $window.location.reload();
                    $location.path("/");
                })
                .error(function (data){
                    alert("Username o contraseña incorrecta");
                });
        }
    };

}]);

app.controller("SignUpController", ['$scope','$window','$http', "$cookies", "$cookieStore", "$location", function($scope,$window, $http,$cookies, $cookieStore,$location){

    $scope.user = {};
    $scope.status=true;

	$scope.update = function(user){
        if (user.pass == user.repass){
            if (user.male != null){
                user.gender=true;
            }else{
                user.gender=false;
            }
            $http.post(addr + "/signup", user)
                .success(function (data){
                    $cookies.put('username',user.username);
                    $window.location.reload();
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
	var send = {username: $cookies.get('username')};
	$scope.info = {};

	//Receive data comments
	$http.post(addr + "/datos", send)
		.success(function(data){
		$scope.info = data;
		    if(data.gender){
		        $scope.info.gender="Male";
		    }else{
		        $scope.info.gender="Female";
		    }

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
