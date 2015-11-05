'use strict';

/**
 * @ngdoc service
 * @name waoApp.ContactService
 * @description
 * # ContactService
 * Service in the waoApp.
 */
angular.module('waoApp')
  .service('ContactService', ['$http', function($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var contact = this;

    contact.sendQuery = function(urlData) {
      //Below commented http call to be impleted when backend api stuff is ready
      // return $http.post('/contact/save',{'contactus': urlData},{'headers': {'Content-Type': 'application/x-www-form-urlencoded'}});
      console.log(urlData);
      //Mock response
      var response = {
        "success": true
      };
      return response;
    };

    contact.contactOwner = function(id) {
      //Below commented http call to be impleted when backend api stuff is ready
      //return $http.get('/seeker/contact-owner?listingId=' + id);

      //Mock response
      return $http.get('/seeker/contact-owner?listingId=' + id);
    };

  }]);