angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

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
            templateUrl: 'views/cesta.html',
            controller: 'ElementsController'
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