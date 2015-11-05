'use strict';

/**
 * @ngdoc filter
 * @name waoApp.filter:ghdateformat
 * @function
 * @description
 * # ghdateformat
 * Filter in the waoApp.
 */

angular.module('waoApp')
  .filter('ghdateformat', [function() {
    function prettyDate(time) {

      var date = new Date((time.split('.')[0] || "").replace(/-/g, "/").replace(/[TZ]/g, " ")),
        diff = (((new Date()).getTime() - date.getTime()) / 1000),
        day_diff = Math.floor(diff / 86400),
        number;

      return day_diff === 0 && (
          diff < 172800 && "Today") ||
        day_diff === 1 && "Yesterday" ||
        day_diff < 7 && day_diff + " days ago" ||
        day_diff < 31 && (number = Math.floor(day_diff / 7)) + (number === 1 ? " week" : " weeks") + " ago" ||
        day_diff < 62 && Math.floor(day_diff / 31) + " month ago" ||
        day_diff >= 62 && Math.floor(day_diff / 31) + " months ago";
    }

    return function(text) {
      try {
        var date1 = text.split([' '])[0],
          date = date1 + 'T00:00:00Z';
        date = prettyDate(date, date1);
        return date ? date : "Today";
      } catch (err) {
        console.warn("Inappropriate Date format passed to filter");
        return text && text.replace(/\s/g) !== "" ? text : "Today";
      }
    };
  }]);
