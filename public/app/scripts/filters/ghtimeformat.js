'use strict';

/**
 * @ngdoc filter
 * @name waoApp.filter:ghtimeformat
 * @function
 * @description
 * # ghtimeformat
 * Filter in the waoApp.
 */
angular.module('waoApp')
  .filter('ghtimeformat', [function() {
    var formatDate = function(curDate) {
        if (!/[a-z]/g.test(curDate.toLowerCase())) {
          var dates = curDate.split('-'),
            monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          return dates[2] + "-" + monthNames[parseInt(dates[1], 10) - 1] + "-" + dates[0];
        } else {
          return curDate;
        }
      },
      prettyDate = function(time) {
        var date = new Date((time.split('.')[0] || "").replace(/-/g, "/").replace(/[TZ]/g, " ")),
          diff = (((new Date()).getTime() - date.getTime()) / 1000),
          day_diff = Math.floor(diff / 86400);

        return day_diff === 0 && (
            diff < 60 && "just now" ||
            diff < 120 && "1 minute ago" ||
            diff < 3600 && Math.floor(diff / 60) + " minutes ago" ||
            diff < 7200 && "1 hour ago" ||
            diff < 172800 && Math.floor(diff / 3600) + " hours ago") ||
          day_diff === 2 && "Yesterday" ||
          day_diff < 7 && day_diff + " days ago" ||
          day_diff < 31 && Math.floor(day_diff / 7) + " weeks ago" ||
          day_diff < 62 && Math.floor(day_diff / 31) + " month ago" ||
          day_diff >= 62 && Math.floor(day_diff / 31) + " months ago";
      };
    return function(text) {
      if (text === undefined) {
        return;
      }
      try {
        var date1 = text.split([' '])[0],
          time = text.split([' '])[1],
          date = date1 + 'T' + time + 'Z';
        date = prettyDate(date, date1);
        return formatDate(date);
      } catch (err) {
        return formatDate(text);
      }
    };
  }]);
