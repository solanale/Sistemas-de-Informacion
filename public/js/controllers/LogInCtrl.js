angular.module('LogInCtrl', []).controller('LogInController', ['$scope','$http', '$location','$cookies', function($scope, $http, $location,$cookies) {
    $scope.logIn = function{
        var checkuser = {
            name: $scope.name,
            pass: $scope.pass,
        };
        $http.post("/logIn",checkuser).success(function (user){
            $location.path("/elements");
        }).error(function (){
            alert("Nombre o email ya registrado.");
        })
    };

}]);