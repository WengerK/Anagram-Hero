'use strict';

var game = angular.module('anagram_hero.game', [
    'ngRoute',
    'anagram_hero.game.round_service',
    'anagram_hero.game.anagram_service',
    'anagram_hero.game.filters'
])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/game', {
        templateUrl  : 'Modules/game/game.html',
        controller   : 'GameCtrl',
        title        : 'Game',
        authenticated: false
    });
}])

.controller('GameCtrl', ['$rootScope', '$scope', 'AuthService', 'AnagramService', 'RoundService', function($rootScope, $scope, AuthService, AnagramService, RoundService) {
    $scope.user = AuthService.getUser();
    $scope.game_words = AnagramService.words;
    $scope.game_score = 0;

    $scope.guess = '';
    $scope.round = {};
    $scope.running = false;

    // Check the pressed value is autorhized by the game
    $scope.authorizeValue = function(event) {
        if( $scope.running === true ){
            RoundService.authorize(event);
        }else{
            event.preventDefault();
        }
    };

    // Check the user entry to calculate score
    $scope.checkGuess = function(event) {
        if( $scope.running === true ){
            $scope.round = RoundService.score($scope.guess, event);
        }
    };

    // Check user submit to calculate game score and init new round
    $scope.checkWord = function(guess) {
        var isvalid = RoundService.check($scope.guess);
        if( isvalid && $scope.running === true ){
            $scope.game_score += $scope.round.score;

            // Animate the losing point
            var div = angular.element('<div class="lose-point">-'+$scope.game_score+'</div>');
            $('.game--round-lose-points').append(div);
            $(div).transition({ opacity: 0, y: 20 }, function(){
                // Remove element when animation is finished
                this.remove()
            });

            RoundService.init().$promise.then(function(word) {
                $scope.guess = '';
                $scope.round = RoundService.get();
            });
        }else{
             // Error animation
             $('.game--wrapper').addClass('shake');
             setTimeout(function() {
                 $('.game--wrapper').removeClass("shake");
             }, 800);
        }
    };

     $rootScope.$on('times-up', function() {
         $scope.running = false;
         console.log('times-up');
     });

     var gameInit = function(){
         // Init game animations
         RoundService.init().$promise.then(function(word) {
             $scope.round = RoundService.get();
             $scope.running = true;
         });
     }

     gameInit();
}]);
