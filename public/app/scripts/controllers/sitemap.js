'use strict';

/**
 * @ngdoc function
 * @name waoApp.controller:SitemapController
 * @description
 * # SitemapController
 * Controller of the waoApp
 */
angular.module('waoApp')
  .controller('SitemapController', ['$routeParams', '$scope', 'sitemap', function($routeParams, $scope, sitemap) {
    $scope.citykey = $routeParams.citykey || '';
    $scope.showAllLink = $routeParams.citykey ? false : true;
    sitemap.getSiteMapData().then(function(data) {
      $scope.data = data;
    });
  }]);
