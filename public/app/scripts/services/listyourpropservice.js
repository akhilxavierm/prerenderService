'use strict';

/**
 * @ngdoc service
 * @name waoApp.ListyourpropService
 * @description
 * # ListyourpropService
 * Service in the waoApp.
 */
angular.module('waoApp')
  .service('ListyourpropService', ['$http', function($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var listproperty = this;

    listproperty.submitPropertyDetails = function(urlData) {

      //Below commented http call to be impleted when backend api stuff is ready
      //return $http.post('/listing/list',{'data':urlData}, {'headers': {'Content-Type': 'application/x-www-form-urlencoded ; charset=UTF-8'}});
      console.log(urlData);
      //Mock response
      var response = {
        "success": true,
        "data": null
      };
      return response;

    };

  }]);
