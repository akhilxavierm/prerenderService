'use strict';

/**
 * @ngdoc directive
 * @name waoApp.directive:ghAutocomplete
 * @description
 * # ghAutocomplete
 */
angular.module('waoApp')
  .directive('ghAutocomplete', [function() {
    return {
      templateUrl: 'views/gh-autocomplete.html',
      restrict: 'E',
      controller: ['$scope', function($scope) {
        //console.log('$scope', $scope);
      }],
      link: function($scope) {
        $scope.$watch('mapSearch', function(newValue) {
          //console.log('newValue', newValue);
        });

        $scope.$watch('details', function(newValue, oldValue) {
          //console.log('details', newValue);
        });

        $scope.$watch('options', function(newValue, oldValue) {
          //console.log('options', newValue);
        });
      }
    };
  }]);
