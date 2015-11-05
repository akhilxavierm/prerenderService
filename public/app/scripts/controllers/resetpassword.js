'use strict';

/**
 * @ngdoc function
 * @name waoApp.controller:ResetpasswordController
 * @description
 * # ResetpasswordController
 * Controller of the waoApp
 */
angular.module('waoApp')
  .controller('ResetpasswordController', ['$routeParams', '$location', '$scope', 'user', function($routeParams, $location, $scope, user) {
    var authkey = $routeParams.authKey;
    if (!authkey) {
      $location.path('/not-found');
    }
    $scope.reset = {
      password: "",
      confirmPassword: "",
      authkey: authkey,
      errors: {}
    };

    $scope.updatePassword = function(validState) {
      if (validState) {
        user.resetpassword($scope.reset).
        success(function(data) {
          if (!data.success) {
            $scope.reset.errors.password = data.password;
            $scope.reset.errors.confirmPassword = data.confirmPassword;
            $scope.reset.errors.authKey = data.authKey;
          } else {
            $location.path('/');
          }
        });
      }
    };
  }]);
