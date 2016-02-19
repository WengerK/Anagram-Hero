'use strict';

angular.module('anagram_hero.game.anagram_service', [])

.factory('AnagramService', ['WordApi', 'SaveScoreApi',
    function(WordApi, SaveScoreApi){

        var anagramService = {};
        anagramService.words = new Array();

        // Retrieve a random word
        anagramService.getWord = function () {
            return WordApi.query();
        }

        // Retrieve a random word
        anagramService.saveScore = function (user, highscore) {
            var score = new SaveScoreApi();
            score.highscore = 2000;
            return score.$update({
                name: user
            });
        }


        return anagramService;
    }
])
