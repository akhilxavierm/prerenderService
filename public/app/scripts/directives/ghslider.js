'use strict';

/**
 * @ngdoc directive
 * @name waoApp.directive:ghSlider
 * @description
 * # ghSlider
 */
angular.module('waoApp')
  .directive('ghSlider', ['$timeout', function($timeout) {
    return {
      templateUrl: 'views/gh-slider.html',
      restrict: 'E',
      controller: ['$scope', 'GH_EVENTS', function($scope, GH_EVENTS) {
        $scope.contacted = false;
        $scope.$on(GH_EVENTS.CLOSE_ALL, function(e, msg) {
          console.log(e, msg);
          $scope.contacted = false;
        });

        $timeout(function() {
          $scope.$broadcast('rebuild:me');
        });

        $scope.mapObject = {
          center: {
            lat: 13.036669,
            lng: 77.546997
          },
          zoom: 8
        };
      }]
    };
  }]);
