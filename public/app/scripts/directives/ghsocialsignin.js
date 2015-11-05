'use strict';

/**
 * @ngdoc directive
 * @name waoApp.directive:ghSocialSignin
 * @description
 * # ghSocialSignin
 */
angular.module('waoApp')
  .directive('ghSocialSignin', ['$timeout', '$rootScope', '$stateHandle', 'user',
    function($timeout, $rootScope, $stateHandle, user) {
      return {
        templateUrl: 'views/gh-social-signin.html',
        restrict: 'E',
        controller: ["$scope", function($scope) {
          
          $scope.gPlusSignIn = function() {
            user.googleplusSignIn($scope.closeAuthModal);
          };

          $scope.fbLogin = function() {
            user.facebookSignIn($scope.closeAuthModal);
          };

          $scope.linkedinLogin = function() {
            user.linkedinSignIn($scope.closeAuthModal);
          };

        }]
      };
    }
  ]);
