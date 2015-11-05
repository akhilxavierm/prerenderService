'use strict';

/**
 * @ngdoc directive
 * @name waoApp.directive:ghContactDetails
 * @description
 * # ghContactDetails
 */
angular.module('waoApp')
    .directive('ghContactDetails', [function() {
        return {
            templateUrl: 'views/gh-contact-details.html',
            restrict: 'E',
            replace: true
        };
    }]);
