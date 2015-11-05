'use strict';

/**
 * @ngdoc function
 * @name waoApp.controller:MoreinfoController
 * @description
 * # MoreinfoController
 * Controller of the waoApp
 */
angular.module('waoApp')
  .controller('MoreinfoController', ['$rootScope', '$scope', 'search', 'GH_EVENTS',
    function($rootScope, $scope, search, GH_EVENTS) {

      //$scope.listingId = $routeParams['id'];
      $scope.moreInfoController = true;
      $scope.shortListed = false;
      $scope.slideshow = false;
      $scope.showReportText = true;
      $scope.contacted = false;

      search.getListingData($scope.listingId).then(function(data) {

        $scope.listingInfo = data;
        document.title = $scope.listingInfo.details.title + ' | Grabhouse';
        if ($scope.listingInfo.shortlisted === undefined) {
          $scope.shortListed = false;
        } else {
          $scope.shortListed = $scope.listingInfo.shortlisted;
        }
        $scope.addrLine1 = $scope.listingInfo.details.location.name;
        if ($scope.addrLine1.length > 60) {
          for (var i = 59; i > 0; i--) {
            if ($scope.addrLine1.charAt(i) === ',') {
              $scope.addrLine2 = $scope.addrLine1.substring(i + 1, $scope.addrLine1.length);
              $scope.addrLine1 = $scope.addrLine1.substring(0, i + 1);
              break;
            }
          }
        }
        $scope.locationArr = $scope.listingInfo.details.location.name.split(',');
      }, function() {});

      $scope.changeIndex = function(index) {
        $rootScope.$broadcast(GH_EVENTS.SHOW_OVERLAY, "Show Photo Slider");
        $scope.listingInfo.photos[index].active = true;
        $scope.slideshow = true;
      };

      $scope.sliderClose = function() {
        $rootScope.$broadcast(GH_EVENTS.CLOSE_ALL, "Close All Photo Slider");
      };

      $scope.$on(GH_EVENTS.CLOSE_ALL, function() {
        $scope.slideshow = false;
        $scope.contacted = false;
      });

      // start: Places service code + ui-bootdtrap setting for accordion
      $scope.oneAtATime = true;

      $scope.status = {
        isFirstOpen: true,
        isFirstDisabled: false
      };

      $scope.mapObject = {
        center: {
          lat: 12.94206,
          lng: 77.62229
        },
        zoom: 15
      };
      // end: Places service code + ui-bootdtrap setting for accordion
    }
  ]);
