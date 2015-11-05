'use strict';

/**
 * @ngdoc directive
 * @name waoApp.directive:ghOverlay
 * @description
 * # ghOverlay
 */
angular.module('waoApp')
  .directive('ghOverlay', ['$rootScope', 'GH_EVENTS', function($rootScope, GH_EVENTS) {
    return {
      templateUrl: 'views/gh-overlay.html',
      restrict: 'E',
      controller: ['$scope', function($scope) {
        $scope.hideOverlay = function() {
          $rootScope.$broadcast(GH_EVENTS.CLOSE_ALL, "Close All Windows");
        };
        $scope.$on(GH_EVENTS.SHOW_OVERLAY, function() {
          $scope.overlayActive = true;
        });
        $scope.$on(GH_EVENTS.HIDE_OVERLAY, function() {
          $scope.overlayActive = false;
        });
      }]
    };
  }]);
