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



app.controller("LogInController", ['$scope','$http', '$location','$cookies', function($scope, $http, $location,$cookies) {
    $scope.logIn = function{
        var checkuser = {
            name: $scope.name,
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
    $scope.logIn = function{
        var newuser = {
            name: $scope.name,
            pass: $scope.pass,
            email:
            apellidos
        };
        $http.post("/signUp",checkuser).success(function (user){
            $location.path("/");
        }).error(function (){
            alert("Usuario o contraseña incorrectos.");
        })
    };

}]);
