'use strict';

angular.module('anagram_hero.authentication.services', [])

.factory('AuthService', ['AuthApi', '$cookieStore',
    function(AuthApi, $cookieStore){

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

            if( logged == false && typeof $cookieStore.get('user') !== 'undefined' ){
                logged = true;
                authService.setUser($cookieStore.get('user'));
            }

            return logged;
        }

        authService.setUser = function(data) {
            $cookieStore.put('user', data);
            savedData = data;
        }
        authService.getUser = function() {
            return savedData;
        }

        return authService;
    }
])
