'use strict';

/**
 * @ngdoc directive
 * @name waoApp.directive:ghNotifications
 * @description
 * # ghNotifications
 */
angular.module('waoApp')
  .directive('ghNotifications', ['$location', '$timeout', '$stateHandle', 'notification', 'GH_EVENTS',
    function($location, $timeout, $stateHandle, notification, GH_EVENTS) {
      return {
        templateUrl: 'views/gh-notifications.html',
        restrict: 'E',
        controller: ['$scope', function($scope) {
          $scope.count = 1;
          $scope.notifications = [];
          $scope.showBubble = false;
          $scope.leads = 0;
          $scope.authenticated = false;
          //var notificationBallon = {};

          $scope.toggleNotification = function() {
            $scope.authenticated = $stateHandle.getUserAuth();
            if ($stateHandle.getUserAuth() !== true) {
              var balloon = {
                "_id": "-1",
                "type": 1,
                "status": 0,
                "content": {
                  "text": {
                    "head": "Want to dial-in the first owners number.",
                    "body": "Sign-Up today!",
                    "footer": "Sign-Up today!"
                  },
                  "action": null
                },
                "addedOn": ""
              };
              $scope.notifications[0] = balloon;
              //$scope.balloonObject = balloon;
            }
            $scope.showBubble = false;
            $scope.showNotification = !$scope.showNotification;
          };

          $scope.handleClick = function(balloonObject) {
            //console.log('balloonObject', balloonObject);
            if (!$stateHandle.getUserAuth()) {
              var url = '/user/signup';
              $scope.count--;
              $location.path(url);
            } else {
              notification.setNotificationRead(balloonObject._id).success(function() {
                balloonObject.status = true;
                $scope.count--;
              });
            }
          };

          $scope.getStatus = function(index) {
            if (index === 0 || $scope.notifications[index].addedOn === "") {
              return true;
            }
            var currentDate = new Date($scope.notifications[index].addedOn);
            var previousDate = new Date($scope.notifications[index - 1].addedOn);
            if (currentDate.toLocaleDateString() === previousDate.toLocaleDateString()) {
              return false;
            } else {
              return true;
            }
          };

          $scope.getDate = function(value) {
            if (value === undefined || value === '') {
              return;
            }
            return value.split(' ')[1];
          };

          $scope.setValue = function() {
            notification.getNotificationCount().success(function(data) {
              $scope.count = data.count;
            });

            notification.getLeads().success(function(data) {
              $scope.leads = data.leadsAvailable || 0;
            });

            notification.getNotifications().success(function(data) {
              $scope.notifications = data;
            });
          };

          $scope.$on(GH_EVENTS.SHOW_NOTIFICATION, function(e, balloon) {
            //console.log('show balloon');
            $scope.showNotification = false;
            //$scope.setValue();
            $scope.balloonObject = balloon;
            $scope.showBubble = true;
            $timeout(function() {
              $scope.showBubble = false;
            }, 2000);
          });
        }]
      };
    }
  ]);
