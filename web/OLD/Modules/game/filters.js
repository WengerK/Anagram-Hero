'use strict';

angular.module('anagram_hero.game.filters', [])
    .filter('timer', ['$sce', function($sce){
        return function(timer){
            var minutes = 0;
            var seconds = 0;
            if( timer >= 60 ){
                minutes = Math.floor((timer/60)%60);
            }
            seconds = timer % 60;

            return $sce.trustAs('html', '<div class="minutes">'+('0'+minutes).slice(-2)+'</div>' +
                    '<div class="dotes">:</div>' +
                    '<div class="seconds">'+('0'+seconds).slice(-2)+'</div>');
    };
}])

;
