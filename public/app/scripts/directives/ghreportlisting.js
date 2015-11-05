'use strict';

/**
 * @ngdoc directive
 * @name waoApp.directive:ghReportListing
 * @description
 * # ghReportListing
 */
angular.module('waoApp')
  .directive('ghReportListing', ['$http', 'reportListingService', function($http, reportListingService) {
    return {
      replace: true,
      templateUrl: 'views/gh-report-listing.html',
      restrict: 'E',
      controller: ['$scope', function($scope) {
        $scope.showReportList = false;
        $scope.hideReportList = false;
        $scope.noReportedText = true;
        $scope.reportComplaintMsg = "not available";

        $scope.reportListing = function(listing) {
          if (!listing) {
            listing = $scope.listingInfo;
          }
          $scope.showReportList = false;
          reportListingService.reportProperty(listing.id, $scope.reportComplaintMsg).success(function(data) {

            //Mock resposne till the backend APIs are ready
            data = {
              "success": 1
            };

            if (data.success === '1' && data.code === '1') {
              $scope.reportedText = "You already reported this as " + data.message;
            } else if (data.success === '1') {
              $scope.reportedText = "This listing has been reported as " + $scope.reportComplaintMsg;
            }
            $scope.noReportedText = false;
            $scope.hideReportList = true;
          });
        };
        $scope.$on("close-everyone", function() {
          $scope.reported = false;
        });
      }]
    };
  }]);
