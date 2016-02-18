'use strict';

angular.module('anagram_hero.home', [
    'ngRoute',

    // Translations

])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl  : 'Modules/home/home.html',
        controller   : 'HomeCtrl',
        title        : 'Home',
        authenticated: true
    });
}])

.controller('HomeCtrl', ['$scope', 'AuthService', function($scope, AuthService) {
    $scope.user = AuthService.getUser();
}]);
