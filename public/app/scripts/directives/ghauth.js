'use strict';

/**
 * @ngdoc directive
 * @name waoApp.directive:ghAuth
 * @description
 * # ghAuth
 */
angular.module('waoApp')
  .directive('ghAuth', ['$stateHandle', '$rootScope', 'user', 'GH_EVENTS', function($stateHandle, $rootScope, user, GH_EVENTS) {
    return {
      templateUrl: 'views/gh-auth.html',
      restrict: 'E',
      controller: ["$scope", function($scope) {

        $scope.signin = {
          userid: "",
          password: "",
          loginFailError: false
        };

        $scope.signup = {
          gender: "",
          password: "",
          emailAddress: "",
          mobile: "",
          lastName: "",
          firstName: "",
          errors: {}
        };

        $scope.closeAuthModal = function() {
          $scope.userData = user.getData();
          if ($scope.loginForm) {
            $scope.loginForm.$submitted = false;
          }
          if ($scope.signupForm) {
            $scope.signupForm.$submitted = false;
          }

          $scope.$emit(GH_EVENTS.CLOSE_ALL, "Close All Auth Window");

          if (!$scope.userData.isGuest) {

            var balloon = {
              "_id": "-1",
              "type": 2,
              "status": 0,
              "content": {
                "text": {
                  "head": "Want to contact 7 more owners for FREE?",
                  "body": "Post your requirement today!",
                  "footer": null
                },
                "action": null
              },
              "addedOn": ""
            };
            $rootScope.$broadcast(GH_EVENTS.SHOW_NOTIFICATION, balloon);
          }
        };


        $scope.signin = function(validState) {
          if (validState) {
            user.grabhouseSignIn($scope.signin, $scope.closeAuthModal);
          }
        };

        $scope.signup = function(validState) {
          if (validState) {
            user.grabhouseSignUp($scope.signup, $scope.closeAuthModal);
          }
        };

      }]

    };
  }]);
