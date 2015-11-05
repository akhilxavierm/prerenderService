'use strict';

/**
 * @ngdoc function
 * @name waoApp.controller:UnsubscribeController
 * @description
 * # UnsubscribeController
 * Controller of the waoApp
 */
angular.module('waoApp')
  .controller('UnsubscribeController', ['$location', '$http', '$routeParams', '$scope', 'user',
    function($location, $http, $routeParams, $scope, user) {

      var authkey = $routeParams.u;
      if (!authkey) {
        $location.path('/not-found');
      }
      user.unsubscribe(authkey).success(function(data) {
        if (data.success) {
          $scope.success = true;
        } else {
          $scope.success = true;
          $scope.error = data.error;
        }
      });
    }
  ]);
