// ---------------------------------------------------------------
// Flat Surface Shader [FSS]
// ---------------------------------------------------------------
angular.module('anagram_hero.footer', [])
.controller('FooterCtrl', ['$scope', function($scope) {
    $scope.date = Date.now();
}])
/**
 * Angular Directive <footer>
 */
.directive('footer', function() {
    return {
        restrict: 'E',
        templateUrl: 'Modules/layout/footer/footer.html',
    }
});
