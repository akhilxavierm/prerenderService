'use strict';

/**
 * @ngdoc directive
 * @name waoApp.directive:ghMapSearch
 * @description
 * # ghMapSearch
 */
angular.module('waoApp')
  .directive('ghMapSearch', ['$timeout', 'listingResults', 'googleMap', function($timeout, listingResults, googleMap) {
    return {
      templateUrl: 'views/gh-map-search.html',
      restrict: 'E',
      controller: ['$scope', function($scope) {
        $scope.noListingOpenPYR = function() {

        };

        $scope.openCloseDetails = function() {
          if (!$scope.showSlider) {
            listingResults.getlistingSlider().then(function(data) {
              $scope.listingInfos = data;
            });
          }
          $scope.showSlider = !$scope.showSlider;
        };
        $timeout(function() {
          $scope.$broadcast('rebuild:me');
        });

        $scope.$watchCollection('listings', function(newValue) {
          if (newValue !== null) {
            googleMap.initialize(newValue);
          }
        });
      }]
    };
  }]);
