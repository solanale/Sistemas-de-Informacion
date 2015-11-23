var app = angular.module('sampleApp', ['ngRoute', 'appRoutes','ngCookies', 'MainCtrl', 'NerdCtrl', 'BuscarCtrl',
                             'SignUpCtrl','LogInCtrl','ElementsCtrl'
]);

app.config(['$routeProvider',function($routeProvider){
	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})

		.when('/nerds', {
			templateUrl: 'views/nerd.html',
			controller: 'NerdController'
		})

		.when('/buscar', {
			templateUrl: 'views/buscar.html',
			controller: 'BuscarController'
		})

        .when('/elements', {
            templateUrl: 'views/elements.html',
        })

		.when('/log', {
			templateUrl: 'views/logIn.html',
			controller: 'LogInController'
		})

		.when('/sign', {
			templateUrl: 'views/signUp.html',
			controller: 'SignUpController'
		});

	$locationProvider.html5Mode(true);

}]);



app.controller('GenericController', ['$scope','$http', function($scope, $http) {
    	$scope.tagline = 'Nothing beats a pocket protector!';
}]);

app.controller("MainController", ['$scope','$http','$cookies',function($scope,$http,$cookies){
    $scope.isLogged = function() {
        return !angular.isUndefined($cookies.user);
    };

    //Deslogeamos al usuario
    $scope.logOut = function(){
        delete $cookies["user"];
    };
}]);



app.controller('LogInController', ['$scope','$http', '$location','$cookies', function($scope, $http, $location,$cookies) {
    $scope.formInfo = {};

    $scope.logIn = function{
        var checkuser = {
            email: $scope.email,
            pass: $scope.pass,
        };
        $http.post("/logIn",checkuser).success(function (user){
            $location.path("/elements");
        }).error(function (){
            alert("Usuario o contraseña incorrectos.");
        })
    };

}]);

app.controller('SignUpController', ['$scope','$http', '$location', function($scope, $http, $location) {
    $scope.formInfo = {};

    $scope.saveData = function(){
        $scope.nameRequired = '';
        $scope.emailRequired = '';
        $scope.apellidosRequired = '';
        $scope.passRequired = '';
        $scope.repassRequired = '';
        if(!$scope.formInfo.name){
            $scope.nameRequired = 'Campo obligatorio';
        }
        if(!$scope.formInfo.email){
            $scope.emailRequired = 'Campo obligatorio';
        }
        if(!$scope.formInfo.apellidos){
            $scope.apellidosRequired = 'Campo obligatorio';
        }
        if($scope.formInfo.repass != $scope.formInfo.pass){
            $scope.passRequired = 'Las contraseñas deben coincidir'
        }
        if(!$scope.formInfo.pass){
            $scope.passRequired = 'Campo obligatorio';
        }
        if(!$scope.formInfo.repass){
            $scope.repassRequired = 'Campo obligatorio';
        }

    };

    $scope.signup = function{
        var newuser = {
            email: $scope.email,
            name: $scope.name,
            apellidos: $scope.apellidos,
            password: $scope.pass,
            repassword= $scope.repass,
            gender: $scope.gender.male,
            info: $scope.info,
        };
        $http.post("/signUp",newuser).success(function (user){
            $location.path("/");
        }).error(function (){
            alert("Usuario o email ya registrado");
        })
    };




    }

}]);
