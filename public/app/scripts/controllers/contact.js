'use strict';

/**
 * @ngdoc function
 * @name waoApp.controller:ContactController
 * @description
 * # ContactController
 * Controller of the waoApp
 */
angular.module('waoApp')
  .controller('ContactController', ['$scope', 'ContactService', function($scope, ContactService) {

    $scope.submitSuccess = false;
    $scope.submitted = false;
    $scope.formError = false;
    $scope.formErrorMsgs = {
      'name': {
        'required': 'Name cannot be blank'
      },
      'contactNo': {
        'required': 'Contact number cannot be blank',
        'invalid': 'Please Enter valid contact number',
        'length': 'Mobile number must be atleast 10 digits'
      },
      'email': {
        'required': 'Email cannot be blank',
        'invalid': 'Please Enter valid email address'
      },
      'message': {
        'required': 'Message cannot be blank'
      }
    };

    $scope.sendQuery = function(validState) {
      $scope.submitted = true;
      if (validState) {

        var urlData = {
          'name': $scope.name,
          'phone': $scope.contactNo,
          'email': $scope.email,
          'message': $scope.message
        };
        var response = ContactService.sendQuery(urlData);
        if (response.success === true) {
          $scope.submitSuccess = true;
        }
      } else {
        $scope.formError = true;
      }
    };

    var mapReset = document.getElementById("map-reset"),
      mapResetBackground = document.querySelector("#map-reset > i");

    function initialize() {
      mapResetBackground.style.backgroundPosition = "0 0";
      var myLatlng = new google.maps.LatLng(12.933579, 77.614246);
      var mapOptions = {
        disableDefaultUI: true,
        zoomControl: true,
        zoomControlOptions: {
          style: google.maps.ZoomControlStyle.SMALL,
          position: google.maps.ControlPosition.LEFT_BOTTOM
        },
        zoom: 15,
        center: myLatlng,
        styles: [{
          "featureType": "poi",
          "elementType": "labels",
          "stylers": [{
            "visibility": "off"
          }]
        }]
      };

      mapReset.addEventListener("touchend", initialize);
      mapReset.addEventListener("touchstart", function() {
        mapResetBackground.style.backgroundPosition = "-24px 0";
      });


      var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

      var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        icon: '../images/Map_icons/contact-marker.png '
      });
    }

    initialize();
  }]);
