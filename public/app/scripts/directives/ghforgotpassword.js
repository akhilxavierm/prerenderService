'use strict';

/**
 * @ngdoc directive
 * @name waoApp.directive:ghForgotPassword
 * @description
 * # ghForgotPassword
 */
angular.module('waoApp')
  .directive('ghForgotPassword', ['$stateHandle', '$rootScope', 'user', function($stateHandle, $rootScope, user) {
    return {
      templateUrl: 'views/gh-forgot-password.html',
      restrict: 'E',
      controller: ['$scope', function($scope) {
        $scope.forgotScenario = true;
        $scope.fEmail = "";
        $scope.forgotError = "";

        $scope.closeForgotPasswordModal = function() {
          $scope.forgotpasswordactive = false;
          $scope.forgotScenario = true;
          $scope.overlayActive = false;
          $scope.fEmail = "";
          $scope.forgotError = "";
          if ($scope.fPForm) {
            $scope.fPForm.$submitted = false;
          }
          $stateHandle.resetRoute();
        };

        $scope.resetPassword = function(validform) {
          if (validform) {
            var form = {
              email: $scope.fEmail
            };
            user.forgotpassword(form).success(function(data) {
              if (data.success === true) {
                $scope.forgotScenario = false;
              } else if (data.success === false) {
                $scope.forgotError = data.message;
              }
            }).error(function(err) {
              console.log(err);
            });

          }
        };
      }]
    };
  }]);
