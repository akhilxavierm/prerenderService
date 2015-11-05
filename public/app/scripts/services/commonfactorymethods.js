'use strict';

/**
 * @ngdoc service
 * @name waoApp.factoryCollection
 * @description
 * # factoryCollection
 * Factory in the waoApp.
 */
angular.module('waoApp')
  .factory('commonFactoryMethods', ['$http', '$q', '$location', function($http, $q, $location) {
    var obj = {
      requestCall: function(getRequestObject) {
        var defer = $q.defer(),
          httpCallMade = false;

        return function(bool) {
          bool = bool || false;
          if (bool || !httpCallMade) {
            $http(getRequestObject).success(function(data) {
              defer.resolve(data);
            }).error(function(err) {
              defer.reject(err);
            });
            httpCallMade = true;
          }
          return defer.promise;
        };
      },
      changePaginationNumber: function(pageNumber) {
        var currentPath = $location.path();
        if (/(\d$)/.test(currentPath, 'g')) {
          $location.path(currentPath.replace(/(\d.*?$)/, pageNumber));
        } else {
          $location.path(currentPath + "/" + pageNumber);
        }
      }
    };
    return obj;
  }]);
