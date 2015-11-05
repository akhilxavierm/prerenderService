'use strict';

/**
 * @ngdoc directive
 * @name waoApp.directive:ghAutocomplete
 * @description
 * # ghAutocomplete
 */

angular.module('waoApp')
  .directive('ghAutocompleteLocal', ['$http', '$timeout', function($http, $timeout) {
    return {
      replace: true,
      templateUrl: 'views/gh-autocomplete-local.html',
      restrict: 'E',
      link: function(scope, element) {
        scope.clearField = function() {
          setTimeout(function() {
            element.find('input').val("");
          }, 300);
        };
      },
      controller: ['$scope', '$attrs', function($scope, $attrs) {
        var parentOS = $scope.onSelect,
          timeoutId = "";
        $scope.map = {
          'placeHolder': $attrs.ghAutocompletePlaceholder || "Enter Location eg. Koramangala"
        };
        $scope.getLocation = function(val) {
          // API url '/seeker/autocomplete';
          var url = $attrs.requestUrl;
          return $http.get(url, {
            params: {
              q: val
            }
          }, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
          }).then(function(response) {
            $timeout.cancel(timeoutId);
            if (response.data.length > 0) {
              timeoutId = $timeout(function() {
                $scope.searchError = false;
                $scope.gherror = "";
              }, 300);
              return response.data.map(function(item) {
                return item;
              });
            } else {
              timeoutId = $timeout(function() {
                $scope.searchError = true;
                $scope.gherror = "Er! Let's try the locality name again";
              }, 300);
              return [];
            }
          });
        };

        $scope.onSelect = function($item, $model, $label) {
          if ($attrs.clearOnSelect === "true") {
            $scope.clearField();
          }
          try {
            parentOS.apply($scope, arguments);
          } catch (err) {}
        };
      }]
    };
  }]);
