'use strict';

/**
 * @ngdoc service
 * @name waoApp.listingResults
 * @description
 * # listingResults
 * Factory in the waoApp.
 */
angular.module('waoApp')
  .factory('listingResults', ['commonFactoryMethods', function(commonFactoryMethods) {
    var obj = {
      getListings: commonFactoryMethods.requestCall({
        method: 'GET',
        url: "/data/search.json"
      }),
      getlistingSlider: commonFactoryMethods.requestCall({
        method: 'GET',
        url: "/data/slider.json"
      }),
      changePage: commonFactoryMethods.changePaginationNumber
    };
    return obj;
  }]);
