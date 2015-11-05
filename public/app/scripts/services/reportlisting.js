'use strict';

/**
 * @ngdoc service
 * @name waoApp.reportListing
 * @description
 * # reportListing
 * Service in the waoApp.
 */
angular.module('waoApp')
  .service('reportListingService', ['$http', function($http) {

    var report = this;

    report.reportProperty = function(id, complaint) {
      return $http.get('/user/gone?listingId=' + id + '&reportReason=' + complaint);
    };
  }]);