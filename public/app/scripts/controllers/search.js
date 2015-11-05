'use strict';

/**
 * @ngdoc function
 * @name waoApp.controller:SearchController
 * @description
 * # SearchController
 * Controller of the waoApp
 */
angular.module('waoApp')
  .controller('SearchController', ['$scope', '$stateHandle', 'listingResults', 'GH_EVENTS',
    function($scope, $stateHandle, listingResults, GH_EVENTS) {
      $scope.showlist = true;
      $scope.listings = null;
      $scope.showSlider = false;
      $scope.showReportText = false;
      $scope.contacted = false;

      $scope.$on(GH_EVENTS.CLOSE_ALL, function(e, msg) {
        $scope.contacted = false;
      });

      listingResults.getListings().then(function(data) {
        $scope.listings = data;
      });

      $scope.maxSize = 5;
      $scope.itemsPerPage = 5;
      $scope.allPages = 6;

      // Second call done just for example .See network that only one request is made
      // listingResults.getListings().then(function(data) {
      //   console.log(data);
      // });

      // listingResults.getNews().then(function(data) {
      //   console.log(data);
      // });

      // Second call done just for example .See network, unlike the above example
      // second network call for the same url is made because true is passed to the function
      // listingResults.getNews(true).then(function(data) {
      //   console.log(data);
      // });

      $scope.setListingsStart = function(start) {
        $scope.listingStart = start * $scope.itemsPerPage;
      };

      $stateHandle.subscribe('SearchController', '/search/:view?/:slug?').response(function(params) {
        $scope.showlist = ((params.view !== undefined) && (params.view === 'list')) ? true : false;
      });
    }
  ]);
