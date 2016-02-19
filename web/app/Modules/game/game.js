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

.controller('GameCtrl', ['$rootScope', '$scope', 'AuthService', 'AnagramService', function($rootScope, $scope, AuthService, AnagramService, SaveScoreApi) {
    $scope.user = AuthService.getUser();
    $scope.game_words = AnagramService.words;
    $scope.game_score = 0;

    $scope.round_guess = '';
    $scope.round_word = {};
    $scope.round_score = 0;
    $scope.round_guess_last_length = 0;

    $scope.checkGuess = function(event) {
        // Remember the last size to calcule how many char has been erase
        if( $scope.round_guess_last_length > $scope.round_guess.length ){
            if( event.keyCode == 8 && $scope.round_score > 0 ){
                $scope.round_score -= $scope.round_guess_last_length - $scope.round_guess.length;
            }
        }
        // Update the last size
        $scope.round_guess_last_length = $scope.round_guess.length;
    };

    $scope.checkWord = function(guess) {
        if( guess === $scope.round_word.name ){
            console.log('greate');
            $rootScope.$emit("times-stop", {});

            $scope.game_score += $scope.round_score;
            AnagramService.saveScore($scope.user.name, $scope.game_score);
            roundInit();
        }else{
            console.log('bad');
        }
    };

     $rootScope.$on('times-up', function() {
         console.log('times-up');
     });

     var gameInit = function(){
         // Init game animations
         roundInit();
     }

     var roundInit = function(){
         $scope.round_guess = '';
         $scope.round_word = {};
         $scope.round_score = 0;
         $scope.round_guess_last_length = 0;

         AnagramService.getWord().$promise.then(function(word) {
             AnagramService.words.push(word);
             $scope.round_word = word;
             $scope.round_score = parseInt($scope.round_word.highscore);

             $rootScope.$emit("times-start", {});
         });
     }

     gameInit();

}]);
