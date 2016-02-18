'use strict';

angular.module('anagram_hero.authentication', [
    'ngRoute',
    // Translations
])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: 'Modules/authentication/login.html',
        controller: 'AuthenticationLoginCtrl',
        title: 'Login',
    });
}])

.controller('AuthenticationLoginCtrl', ['$scope', '$window', 'AuthService', function($scope, $window, AuthService) {
    $scope.user = {};

    $scope.check = function(user) {
        // $scope.user  = angular.copy(user);

        var result = AuthService.login(user).$promise.then(function(resp) {
            if( AuthService.isLoggedin() ){
                $window.location.href = '#home';
            }
        });
    };

}]);
