'use strict';

/**
 * @ngdoc directive
 * @name waoApp.directive:ghCommute
 * @description
 * # ghCommute
 */
angular.module('waoApp')
  .directive('ghCommute', [function() {
    return {
      templateUrl: 'views/gh-commute.html',
      restrict: 'E'
    };
  }]);
