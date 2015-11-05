'use strict';

/**
 * @ngdoc directive
 * @name waoApp.directive:ghListSearch
 * @description
 * # ghListSearch
 */
angular.module('waoApp')
  .directive('ghListSearch', [function() {
    return {
      templateUrl: 'views/gh-list-search.html',
      restrict: 'E'
    };
  }]);
