'use strict';

/**
 * @ngdoc directive
 * @name waoApp.directive:ghCashCounter
 * @description
 * # ghCashCounter
 */
angular.module('waoApp')
  .directive('ghCashCounter', [function() {
    return {
      templateUrl: 'views/gh-cash-counter.html',
      restrict: 'E',
      controller: ['$scope', '$stateHandle', function($scope, $stateHandle) {
        $scope.postSuccess = false;
        $scope.autocomplete = '';
        $scope.owner = {
          'fullName': '',
          'mobile': '',
          'accomodationType': 2,
          'location': ''
        };

        $scope.closeCashCounterModal = function() {
          $scope.cashcounterActive = false;
          $scope.overlayActive = false;
          if ($scope.oDForm) {
            $scope.oDForm.$submitted = false;
          }
          $stateHandle.resetRoute();
        };

        $scope.updateODetails = function(isValid) {
          $scope.owner.location = $scope.autocomplete;
          //console.log('$scope.owner', $scope.owner);
          if (isValid) {
            $scope.postSuccess = true;
          }
        };

      }]
    };
  }]);
