'use strict';

/**
 * @ngdoc directive
 * @name waoApp.directive:ghSocialShare
 * @description
 * # ghSocialShare
 */
angular.module('waoApp')
  .directive('ghSocialShare', ['$window', function($window) {
    return {
      templateUrl: 'views/gh-social-share.html',
      restrict: 'E',

      controller: ['$scope', function($scope) {
        $scope.showSocialShare = false;

        $scope.toggle = function() {
          $scope.showSocialShare = !$scope.showSocialShare;
        };

        $scope.gplusShare = function() {
          var url = 'https://plus.google.com/share?url=';
          $scope.socialShare(url, "Google Plus Share");
        };

        $scope.fbShare = function() {
          var url = 'https://www.facebook.com/dialog/share?app_id=145634995501895&display=popup&redirect_uri=https://www.facebook.com&href=';
          $scope.socialShare(url, "Facebook Share");
        };

        $scope.twtShare = function() {
          var url = 'https://twitter.com/share?url=';
          $scope.socialShare(url, "LinkedIn Share");
        };

        $scope.socialShare = function(url, title) {
          var currentUrl = 'https://grabhouse.com/';
          url = url + encodeURIComponent(currentUrl);
          var left = (screen.width / 2) - 200;
          var top = (screen.height / 2) - 250;
          return $window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=400, height=500, top=' + top + ', left=' + left);
        };
      }]
    };
  }]);
