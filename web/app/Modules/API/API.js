'use strict';

angular.module('anagram_hero.api', [
    'ngResource',
])
.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}])

.factory('AuthApi', ['$resource',
    function($resource){
        return $resource('http://localhost:port/users/:name', {port: ':3000'}, {
            query: {method:'GET', params:{}, isArray:true}
        });
    }
])

;
