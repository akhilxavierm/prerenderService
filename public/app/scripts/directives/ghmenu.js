'use strict';

/**
 * @ngdoc directive
 * @name waoApp.directive:ghMenu
 * @description
 * # ghMenu
 */
angular.module('waoApp')
  .directive('ghMenu', ['$rootScope', '$stateHandle', 'user', 'GH_EVENTS',
    function($rootScope, $stateHandle, user, GH_EVENTS) {
      return {
        templateUrl: 'views/gh-menu.html',
        restrict: 'E',
        controller: ['$scope', function($scope) {
          $scope.toggle = function() {
            $scope.showNotification = false;
            $scope.showMenu = !$scope.showMenu;

            if ($scope.showMenu) {
              $scope.overlayActive = true;
            } else {
              $scope.overlayActive = false;

            }
          };

          $scope.logout = function() {
            user.SignOut(function() {
              $scope.userData = user.getData();
              $scope.$emit(GH_EVENTS.CLOSE_ALL, "Close All");
            });
          };

          $stateHandle.subscribe('ghMenu', "/user/profile").response(function() {
            $scope.showMenu = false;
            $scope.profileActive = true;
            $scope.overlayActive = true;
          });

          $stateHandle.subscribe('ghMenu', "/incentivisation/owner-details").response(function() {
            $scope.showMenu = false;
            $scope.cashcounterActive = true;
            $scope.overlayActive = true;
          });

        }]
      };
    }
  ]);
