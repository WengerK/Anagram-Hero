'use strict';

angular.module('anagram_hero.api', [
    'ngResource',
])
.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.layout['X-Requested-With'];
}])

.factory('Companies', ['$resource',
  function($resource){
    //return $resource('http://www.kevin-wenger.ch:port/backend/?q=taxonomy_term/1.json', {port: ':80'}, {
   return $resource('http://www.kevin-wenger.ch:port/backend/api/taxonomy/companies', {port: ':80'}, {
      query: {method:'GET', params:{}, isArray:true}
    });
  }
])

.factory('Skills', ['$resource',
  function($resource){
   return $resource('http://www.kevin-wenger.ch:port/backend/:lang/api/taxonomy/skills', {port: ':80'}, {
      query: {method:'GET', params:{}, isArray:true}
    });
  }
])

.factory('Projects', ['$resource',
  function($resource){
    //return $resource('http://www.kevin-wenger.ch:port/backend/?q=taxonomy_term/1.json', {port: ':80'}, {
   return $resource('http://www.kevin-wenger.ch:port/backend/:lang/api/content/projects', {port: ':80'}, {
      query: {method:'GET', params:{}, isArray:true,
        transformResponse: function(data, headers){
            //MESS WITH THE DATA
            var fromJson = angular.fromJson(data);
            angular.forEach(fromJson, function(value, key){
              fromJson[key].skillsString = '';
              angular.forEach(fromJson[key].skills, function(skill, tid){
                fromJson[key].skillsString += fromJson[key].skills[tid].serializedName + ' ';
              });
            });
            return fromJson;//JSON.parse(returns);
        }
      },
      count: {method:'GET', params:{ 'count': true }, isArray:false}
    });
  }
])

.factory('Project', ['$resource',
  function($resource){
    //return $resource('http://www.kevin-wenger.ch:port/backend/?q=taxonomy_term/1.json', {port: ':80'}, {
   return $resource('http://www.kevin-wenger.ch:port/backend/:lang/api/content/projects/:id', {port: ':80'}, {
      query: {method:'GET', params:{}, isArray:false}

    });

  }
])

//--------------------------------------------------------------------------------------------------
// GOOGLE APIs
/*
.factory('GooglePlusMe', ['$resource',
  function($resource){
    var consumerKey = encodeURIComponent('e0TvvHTZgqx0mZcFflJm0t7Dq');
    var consumerSecret = encodeURIComponent('GzXoaiq98fYfg0GsdB0FiWACKQWm7M29V613uPYaNxw3XCtGwK');
    var credentials = $.base64.encode(consumerKey + ':' + consumerSecret);

    return $resource('https://www.googleapis.com/plus/v1/people/:me?key=:key',
      {
        me: '115569051806053928786',
        key: 'AIzaSyCBqhkkneyCVmytI25CSC9l2Y4OXsFivzM'
      }, {
        query: {method:'GET', params:{}, isArray:false}
    });
  }
])

.factory('GooglePlusActivities', ['$resource',
  function($resource){
    return $resource('https://www.googleapis.com/plus/v1/people/:me/activities/public?key=:key',
      {
        me: '115569051806053928786',
        key: 'AIzaSyCBqhkkneyCVmytI25CSC9l2Y4OXsFivzM'
      }, {
        query : {method:'GET', params:{}, isArray:false}
    });
  }
])


.factory('GooglePlus', ['$resource',
  function($resource, $test){

    var r = $resource('https://www.googleapis.com/plus/v1/people/:me/activities/public?key=:key',
      {
        me: '115569051806053928786',
        key: 'AIzaSyCBqhkkneyCVmytI25CSC9l2Y4OXsFivzM'
      }, {
        query : {method:'GET', params:{}, isArray:false}
      });

      return r;
  }
])

//--------------------------------------------------------------------------------------------------
// FOURSQUARE API
.factory('Foursquare', ['$resource',
  function($resource){
   return $resource('http://www.kevin-wenger.ch:port/backend/:lang/api/foursquare/checkins', {port: ':80'}, {
      query: {method:'GET', params:{}, isArray:false}
    });
  }
])


//--------------------------------------------------------------------------------------------------
// TWITTER API

.factory('Twitter', ['$resource',
  function($resource){
   return $resource('http://www.kevin-wenger.ch:port/backend/:lang/api/twitter/:id', {port: ':80'}, {
      query: {method:'GET', params:{}, isArray:false}
    });
  }
])

*/
;
