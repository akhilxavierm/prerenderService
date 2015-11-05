'use strict';

/**
 * @ngdoc directive
 * @name waoApp.directive:ghTermsAndConditions
 * @description
 * # ghTermsAndConditions
 */
angular.module('waoApp')
    .directive('ghTermsAndConditions', function() {
        return {
            templateUrl: 'views/gh-terms-and-conditions.html',
            restrict: 'E'
        };
    });