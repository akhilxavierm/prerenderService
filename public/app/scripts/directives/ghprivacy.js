'use strict';

/**
 * @ngdoc directive
 * @name waoApp.directive:ghPrivacy
 * @description
 * # ghPrivacy
 */
angular.module('waoApp')
    .directive('ghPrivacy', [function() {
        return {
            templateUrl: 'views/gh-privacy.html',
            restrict: 'E'
        };
    }]);