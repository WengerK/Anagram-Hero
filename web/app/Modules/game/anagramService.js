'use strict';

angular.module('anagram_hero.game.anagram_service', [])

.factory('AnagramService', ['WordApi',
    function(WordApi){

        var anagramService = {};

        // Retrieve a random word
        anagramService.getWord = function () {
            return WordApi.query();
        }

        return anagramService;
    }
])
