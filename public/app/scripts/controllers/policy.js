'use strict';

/**
 * @ngdoc function
 * @name waoApp.controller:PolicyController
 * @description
 * # PolicyController
 * Controller of the waoApp
 */
angular.module('waoApp')
    .controller('PolicyController', ['$scope', '$stateHandle', function($scope, $stateHandle)  {
    	if($stateHandle.route.type === 'privacy'){
    		$scope.selected = false;
    	}else{
    		$scope.selected = true;
    	}
        
    }]);
