'use strict';

/**
 * @ngdoc service
 * @name waoApp.sitemap
 * @description
 * # sitemap
 * Service in the waoApp.
 */
angular.module('waoApp')
  .service('sitemap', ['commonFactoryMethods', function(commonFactoryMethods) {
    this.getSiteMapData = commonFactoryMethods.requestCall({
      method: 'GET',
      url: "/data/sitemap.json"
    });
  }]);
