'use strict';

/**
 * @ngdoc directive
 * @name waoApp.directive:ghHeader
 * @description
 * # ghHeader
 */
angular.module('waoApp')
  .directive('ghHeader', ['$location', '$timeout', '$stateHandle', '$rootScope', 'user', 'GH_EVENTS',
    function($location, $timeout, $stateHandle, $rootScope, user, GH_EVENTS) {
      return {
        templateUrl: 'views/gh-header.html',
        restrict: 'E',
        scope: {},
        controller: ["$scope", function($scope) {
          $scope.modalActive = false;
          $scope.authActive = false;
          $scope.forgotpasswordactive = false;
          $scope.showMenu = false;
          $scope.profileActive = false;
          $scope.overlayActive = false;
          $scope.showNotification = false;
          $scope.cashcounterActive = false;

          $scope.userData = {};

          $scope.userData = user.getData();

          $scope.$on(GH_EVENTS.CLOSE_ALL, function(e, msg) {
            //console.log(e, msg);
            $timeout(function() {
              $scope.modalActive = false;
              $scope.authActive = false;
              $scope.forgotpasswordactive = false;
              $scope.showMenu = false;
              $scope.overlayActive = false;
              $scope.profileActive = false;
              $scope.cashcounterActive = false;
              $scope.showNotification = false;
              $stateHandle.resetRoute();
            });

          });

          $stateHandle.subscribe('ghHeader', "/user/:auth?").response(function(params) {
            if (!$scope.userData.isGuest) {
              $location.url("/");
            } else {
              $scope.showMenu = false;
              $scope.showNotification = false;
              $scope.overlayActive = true;
              if (params.auth === "forgotpassword") {
                $scope.forgotpasswordactive = true;
                $scope.modalActive = false;
              } else if (params.auth === "signin" || params.auth === "signup") {
                $scope.forgotpasswordactive = false;
                $scope.modalActive = true;


                if (params.auth === "signin") {
                  $scope.authActive = true;
                } else if (params.auth === "signup") {
                  $scope.authActive = false;
                }
              }
            }
          });

        }],
        link: function($scope) {
          $scope.$watch('userData.isGuest', function(newValue) {
            if (!newValue) {
              $stateHandle.setUserAuth(true);
            }
          });
        }
      };

    }
  ]);
