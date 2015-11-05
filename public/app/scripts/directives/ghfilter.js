'use strict';

/**
 * @ngdoc directive
 * @name waoApp.directive:ghFilter
 * @description
 * # ghFilter
 */
angular.module('waoApp')
  .directive('ghFilter', ['$rootScope', 'GH_EVENTS', function($rootScope, GH_EVENTS) {
    return {
      templateUrl: 'views/gh-filter.html',
      restrict: 'E',
      controller: ['$scope', function($scope) {
        $scope.filterActive = false;

        $scope.showfilter = function() {
          $rootScope.$broadcast(GH_EVENTS.SHOW_OVERLAY, "Filter Active");
          $scope.filterActive = true;
        };

        $scope.closefilter = function() {
          $scope.filterActive = false;
          $rootScope.$broadcast(GH_EVENTS.HIDE_OVERLAY, "Filter DeActive");
        };

        $scope.updateFilters = function() {

        };

        $scope.resetFilters = function() {

        };

        $scope.applyChanges = function() {

        };

        $scope.$on("GH_EVENTS.CLOSE_ALL", function() {
          $scope.filterActive = false;
        });
      }]
    };
  }]);
