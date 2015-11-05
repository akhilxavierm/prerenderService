'use strict';

/**
 * @ngdoc directive
 * @name waoApp.directive:ghFooter
 * @description
 * # ghFooter
 */
angular.module('waoApp')
  .directive('ghFooter', [function() {
    return {
      templateUrl: 'views/gh-footer.html',
      restrict: 'E'
    };
  }]);
