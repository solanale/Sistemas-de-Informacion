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

		.when('/geeks', {
			templateUrl: 'views/geek.html',
			controller: 'GeekController'	
		});

        .when('/elements', {
            templateUrl: 'views/elements.html',
            controller: 'ElementsController'
        });

		.when('/log', {
			templateUrl: 'views/logIn.html',
			controller: 'LogInController'
		});

		.when('/sign', {
			templateUrl: 'views/signUp.html',
			controller: 'SignUpController'
		});
		 .otherwise({ redirectTo: "/index" });

	$locationProvider.html5Mode(true);

}]);