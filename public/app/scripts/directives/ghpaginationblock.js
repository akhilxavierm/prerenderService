'use strict';

/**
 * @ngdoc directive
 * @name waoApp.directive:ghPaginationBlock
 * @description
 * # ghPaginationBlock
 */
angular.module('waoApp')
  .directive('ghPaginationBlock', ['$location', '$routeParams', '$stateHandle', 'listingResults', function($location, $routeParams, $stateHandle, listingResults) {
    return {
      restrict: 'A',
      require: 'uibPagination',
      controller: ['$scope', function($scope) {
        var onSubscriptionResponse = false;
        $scope.currentPage = $routeParams.slug;

        $stateHandle.subscribe('ghPaginationBlock', '/search/:view?/:slug?').response(function(params) {
          onSubscriptionResponse = true;
          $scope.currentPage = params.slug;
        });

        $scope.pageChanged = function() {
          if (onSubscriptionResponse) {
            listingResults.changePage($scope.currentPage);
          }
        };

        $scope.setListingsStart($scope.currentPage - 1);
      }]
    };
  }]);
