'use strict';

angular.module('anagram_hero.home', [
    'ngRoute',

    // Translations

])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'Modules/home/home.html',
        controller: 'HomeCtrl',
        title: 'Home',
    });
}])

.controller('HomeCtrl', ['$scope', function($scope) {

}]);
