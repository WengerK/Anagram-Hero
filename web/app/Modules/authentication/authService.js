'use strict';

angular.module('anagram_hero.authentication.services', [])

.factory('AuthService', ['AuthApi',
    function(AuthApi){

        var savedData   = {}
        var authService = {};
        var logged  = false;

        authService.login = function (credentials) {
            var user = AuthApi.query({
                name: credentials.name,
            }, function(){
                if( typeof user !== "undefined" ) {
                    authService.setUser(user);
                    logged = true;
                }
            });
            return user;
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
