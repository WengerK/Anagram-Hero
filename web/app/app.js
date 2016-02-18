'use strict';

// Declare app level module which depends on views, and components
angular.module('anagram_hero', [
    'ngRoute',

// Translations

// Modules Layout
'anagram_hero.footer',

// Modules Pages
'anagram_hero.home',

]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/home'});
}])

.controller('AppCtrl', ['$scope', '$location', /*'$state', 'stateParams',*/ function( $scope, $location/*, $state, $stateParams*/ ) {
}])


.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        if (current.hasOwnProperty('$$route')) {
            $rootScope.title = current.$$route.title + ' | Anagram Hero';
            $rootScope.description = current.$$route.description;
        }
    });
}]);

if ("ontouchstart" in document.documentElement) {
    document.documentElement.className += " touch";
}
