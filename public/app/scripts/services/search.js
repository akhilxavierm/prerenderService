'use strict';

/**
 * @ngdoc service
 * @name waoApp.search
 * @description
 * # search
 * Service in the waoApp.
 */
angular.module('waoApp')
  .factory('search', ['$q', '$http', function($q, $http) {
    return {
      getListingData: function() {
        var deferred = $q.defer();
        var url = "data/moreinfo.json";
        $http.get(url)
          .success(function(data) {
            deferred.resolve(data);
          }).error(function() {
            deferred.reject();
          });
        return deferred.promise;

      },
      getShortListed: function() {
        var deferred = $q.defer();
        var url = "/seeker/search-shortlisted";
        $http({
          method: 'GET',
          url: url
        }).success(function(data) {
          deferred.resolve(data.items);
        }).error(function() {
          deferred.reject();
        });
        return deferred.promise;
      },
      getContacted: function() {
        var deferred = $q.defer();
        var url = "/seeker/leads-used";
        $http({
          method: 'GET',
          url: url
        }).success(function(data) {
          deferred.resolve(data.items);
        }).error(function() {
          deferred.reject();
        });
        return deferred.promise;
      }
    };
  }]);
