'use strict';

/**
 * @ngdoc directive
 * @name waoApp.directive:ghDisableAnimation
 * @description
 * # ghDisableAnimation
 */
angular.module('waoApp')
  .directive('ghDisableAnimation', ['$animate', function($animate) {
    return {
      restrict: 'A',
      compile: function(element) {
        $animate.enabled(false, element);
      }
    };
  }]);
