'use strict';

/**
 * @ngdoc filter
 * @name waoApp.filter:ghformatmoney
 * @function
 * @description
 * # ghformatmoney
 * Filter in the waoApp.
 */
angular.module('waoApp')
  .filter('ghformatmoney', [function() {
    return function(x) {
      if (x === undefined) {
        return "";
      }
      x = ("" + x).replace(/[^0-9]/g, "");
      var lastThree = x.substring(x.length - 3);
      var otherNumbers = x.substring(0, x.length - 3);
      if (otherNumbers !== '') {
        lastThree = ',' + lastThree;
      }
      var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
      return res;
    };
  }]);
