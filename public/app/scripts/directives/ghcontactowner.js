'use strict';

/**
 * @ngdoc directive
 * @name waoApp.directive:ghContactOwner
 * @description
 * # ghContactOwner
 */
angular.module('waoApp')
  .directive('ghContactOwner', ['$rootScope', 'GH_EVENTS',
    function($rootScope, GH_EVENTS) {
      return {
        templateUrl: 'views/gh-contact-owner.html',
        restrict: 'E',
        controller: ['$scope', function($scope) {
          var balloon = {};

          $scope.$on(GH_EVENTS.SHOW_CONTACT_OWNER, function(e, notificationData) {
            $scope.contacted = true;
            //console.log(e, msg);
            balloon = notificationData;
          });

          $scope.contactDetailsClose = function() {
            $scope.contacted = false;
            $rootScope.$broadcast(GH_EVENTS.CLOSE_ALL, "Close All Contact Details");
            $rootScope.$broadcast(GH_EVENTS.SHOW_NOTIFICATION, balloon);
          };
        }]
      };
    }
  ]);
