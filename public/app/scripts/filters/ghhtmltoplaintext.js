'use strict';

/**
 * @ngdoc filter
 * @name waoApp.filter:ghhtmltoplaintext
 * @function
 * @description
 * # ghhtmltoplaintext
 * Filter in the waoApp.
 */
angular.module('waoApp')
  .filter('ghhtmltoplaintext', [function() {
    return function(text) {
      return text ? String(text).replace(/<[^>]+>/gm, '') : '';
    };
  }]);
