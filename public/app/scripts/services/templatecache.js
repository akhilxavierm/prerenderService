'use strict';

/**
 * @ngdoc service
 * @name waoApp.templateCache
 * @description
 * # templateCache
 * Service in the waoApp.
 */
angular.module('waoApp')
  .service('templateCache', ['$q', '$http', '$templateCache', '$window',
    function($q, $http, $templateCache, $window) {

      var worker = new $window.Worker('scripts/services/template-cache-worker.js');
      worker.addEventListener('message', function(e) {
        $templateCache.put(e.data.templateId, e.data.content);
      }, false);

      return {
        doWork: function(list) {
          if ($window.Worker) {
            worker.postMessage({
              list: list
            });
          } else {
            for (var i = 0, len = list.length; i < len; i++) {
              $http.get(list[i], {
                cache: $templateCache
              });
            }
          }
        }
      };
    }
  ]);
