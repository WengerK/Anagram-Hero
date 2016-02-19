'use strict';

var game = angular.module('anagram_hero.game', [
    'ngRoute',
])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/game', {
        templateUrl  : 'Modules/game/game.html',
        controller   : 'GameCtrl',
        title        : 'Game',
        authenticated: false
    });
}])

.controller('GameCtrl', ['$rootScope', '$scope', 'AuthService', 'AnagramService', function($rootScope, $scope, AuthService, AnagramService) {
    $scope.user = AuthService.getUser();
    $scope.timer = 40; // Time for the game in seconds
    $scope.words = new Array();
    $scope.guess = '';
    $scope.currentWord = {};

    $scope.score = 0;
    $scope.guess_last_length = 0;

    AnagramService.getWord().$promise.then(function(word) {
        $scope.words.push(word);
        $scope.currentWord = word;
        $scope.score = parseInt($scope.currentWord.highscore);

        gameInit();
    });

    $scope.checkGuess = function(event) {
        // Remember the last size to calcule how many char has been erase
        if( $scope.guess_last_length > $scope.guess.length ){
            if( event.keyCode == 8 && $scope.score > 0 ){
                $scope.score -= $scope.guess_last_length - $scope.guess.length;
            }
        }
        // Update the last size
        $scope.guess_last_length = $scope.guess.length;
    };

    $scope.checkWord = function(guess) {
        if( guess === $scope.currentWord.name ){
            console.log('greate');
        }else{
            console.log('bad');
        }
    };

     $rootScope.$on('times-up', function() {

     });

     var gameInit = function(){
         // Init game animations
         $rootScope.$emit("times-start", {});
     }

}]);
