'use strict';

angular.module('anagram_hero.authentication.services', [])

.factory('AuthService', ['AuthApi',
    function(AuthApi){

        var savedData   = {}
        var authService = {};
        var logged  = false;

        authService.login = function (credentials) {
            var response = AuthApi.query({
                name: credentials.name,
            }, function(){
                if( typeof response[0] !== "undefined" ) {
                    authService.setUser(response[0]);
                    logged = true;
                }
            });
            return response;
        }

        authService.isLoggedin = function () {
            return logged;
        }

        authService.setUser = function(data) {
            savedData = data;
        }
        authService.getUser = function() {
            return savedData;
        }

        return authService;
    }
])
