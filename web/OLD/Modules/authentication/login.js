'use strict';

angular.module('anagram_hero.authentication', [
    'ngRoute',
    // Translations
])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: 'Modules/authentication/login.html',
        controller: 'AuthenticationLoginCtrl',
        title: 'Login',
    });
}])

.controller('AuthenticationLoginCtrl', ['$scope', '$window', 'AuthService', function($scope, $window, AuthService) {
    $scope.user = {};

    $scope.check = function(user) {
        // Animate the arrow button
        $('.authentication--login--page .login--form--wrapper .login--form .login--form--input-send button .value').transition({ left: '100%', opacity: 0 }, 150, 'cubic-bezier(.65,.01,.72,.22)', function(){
            $(this).css({left: 0}).transition({ left: '50%', delay: 50, opacity: 1}, 150, 'cubic-bezier(.65,.01,.72,.22)', function(){

                // Check name is correct
                if( typeof user.name === 'undefined' || user.name == ''){
                    // Error animation
                    $('.authentication--login--page .login--form--wrapper').addClass('shake');
                    setTimeout(function() {
                        $('.authentication--login--page .login--form--wrapper').removeClass("shake");
                    }, 800);
                }else{

                    // Send username to create/load account
                    var result = AuthService.login(user).$promise.then(function(resp) {
                        if( AuthService.isLoggedin() ){
                            $window.location.href = '#home';
                        }
                    });
                }
            });
        });

        // Animate the left cartridge
        // $('.authentication--login--page .hello--wrapper .left-background').transition({ left: '-50%' }, 300, 'cubic-bezier(.65,.01,.72,.22)');

        // Animate the right cartridge
        // $('.authentication--login--page .hello--wrapper .right-background').transition({ right: '-50%' }, 300, 'cubic-bezier(.65,.01,.72,.22)');


    };

}]);
