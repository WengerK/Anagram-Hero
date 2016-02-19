'use strict';

game.directive('timer', function() {
    return {
        restrict: 'E',
        templateUrl: 'Modules/game/directives/timer.html',
        controller: ['$rootScope', '$scope', '$element', '$attrs', '$timeout', function ($rootScope, $scope, $element, $attrs, $timeout) {

            // Initial value for counter
            $scope.counter = 40;
            var stopped;

            //timeout function
            //1000 milliseconds = 1 second
            //Every second counts
            $scope.countdown = function() {
                stopped = $timeout(function() {
                    if( $scope.counter > 0 ){
                        $scope.counter--;
                        $scope.countdown();
                    }else{
                        $scope.stop();
                        $rootScope.$emit("times-up", {});
                    }
                }, 1000);
            };

            $scope.stop = function(){
                $timeout.cancel(stopped);
            }

            $rootScope.$on('times-start', function() {
                $scope.countdown();
            });

            $rootScope.$on('times-stop', function() {
                $scope.stop;
            });

        }]
    };
});
