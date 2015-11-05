'use strict';

/**
 * @ngdoc service
 * @name waoApp.ShortListService
 * @description
 * # ShortListService
 * Service in the waoApp.
 */
angular.module('waoApp')
  .service('ShortListService', ['$http', function($http) {

    var shortlist = this;

    shortlist.updateShortListActivity = function(id, flag) {
      return $http.get('/user/update-shortlist-is-shortlisted?listingId=' + id + '&isShortListed=' + flag);
    };

  }]);