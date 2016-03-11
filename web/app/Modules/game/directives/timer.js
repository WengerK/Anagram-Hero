'use strict';

game.directive('timer', ['$timeout', '$rootScope', function($timeout, $rootScope) {

// .directive('timer', function() {
    return {
        restrict: 'E',
        templateUrl: 'Modules/game/directives/timer.html',
        link: function (scope, element, attrs) {

            // Initial value for counter
            scope.timer.counter = attrs.counter;
            scope.timer.running = false;

            var stopped;

            //timeout function
            //1000 milliseconds = 1 second
            //Every second counts
            scope.timer.countdown = function() {
                stopped = $timeout(function() {
                    scope.timer.running = true;
                    if( scope.timer.counter > 0 ){
                        scope.timer.counter--;
                        scope.timer.countdown();
                    }else{
                        scope.timer.stop();
                        $rootScope.$emit("times-up", {});
                    }
                }, 1000);
            };

            scope.timer.stop = function(){
                $timeout.cancel(stopped);
                scope.timer.running = false;
            }

            scope.timer.set = function(counter){
                scope.timer.counter = counter;
            }
        },
        controller: ['$rootScope', '$scope', '$element', '$attrs', '$timeout', function ($rootScope, $scope, $element, $attrs, $timeout) {
            $scope.timer = {};

            $rootScope.$on('times-start', function() {
                if( !$scope.timer.running ){
                    $scope.timer.countdown();
                }
            });

            $rootScope.$on('times-stop', function() {
                $scope.timer.stop();
            });

            $rootScope.$on('times-reset', function(counter) {
                $scope.timer.set(counter);
            });

        }]
    };
}]);
