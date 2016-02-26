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

            // Generate the winning points
            var round_score_parts = splitNumber($scope.round.score);
            console.log(round_score_parts);
            // var win_points = new Array();

            // Destination point for each winning points
            var dest = $('.game--page .game--wrapper .game--board .game--board--score').offset();
            console.log(dest);

            angular.forEach(round_score_parts, function(round_score_part, key) {
                var div = angular.element('<div class="win-point">+'+round_score_part+'</div>');
                // win_points.push(div);
                $('.game--round-win-points').append(div);

                var x = Math.floor(Math.random() * 60) + 20;
                var y = Math.floor(Math.random() * 60) + 20;

                $(div).css({left:y+'%',top:x+'%', scale: 0});
                var origin = $(div).offset();


                $(div).transition({ scale: 1.3, opacity: 1, delay: key * 250 }, 200).delay(450).transition({ opacity: 0, x: dest.left - origin.left, y: dest.top - origin.top}, 500, 'cubic-bezier(.47,.2,.31,.54)', function(){
                    console.log('end');
                    $('.game--board--score .score').transition({ scale: 1.3 }, 100).transition({ scale: 1 }, 100);
                    // Remove element when animation is finished
                    this.remove()
                });
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

     /**
      * Splitting a number into integer and decimal portions
      * Will generate a list of [chunk] random numbers that sum of [sum]
      * @method function
      * @param  {[type]} sum [description]
      * @return {[type]}       [description]
      */
     var splitNumber = function(sum){
         // Number of maximum chunk we want to retrieve
         var chunk = 7;
         var splitted = new Array();

         while(sum > 0 && chunk > 0) {
             var part = Math.floor(Math.random() * sum) + 1;
             chunk--;
             sum -= part;
             splitted.push(part);
         }

         if (sum != 0) {
             splitted.push(sum);
        }

        return splitted;
     }

     gameInit();
}]);
