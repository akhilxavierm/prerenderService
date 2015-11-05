'use strict';

/**
 * @ngdoc function
 * @name waoApp.controller:ListpropertyctrlController
 * @description
 * # ListpropertyctrlController
 * Controller of the waoApp
 */
angular.module('waoApp')
  .controller('ListYourPropertyController', ['$scope', '$location', 'ListyourpropService',
    function($scope, $location, ListyourpropService) {

      $scope.submitSuccess = false;
      $scope.formError = false;
      $scope.formErrorMsgs = {
        'name': {
          'required': "Name cannot be blank",
          'limit': "The limit is 15 char",
          'pattern': "Name cannot have special charater"
        },
        'mobile': {
          'required': "Mobile cannot be blank",
          'length': "Please enter valid mobile number",
          'pattern': "Please enter valid mobile number"
        },
        'bName': {
          'required': "Building name cannot be blank"
        },
        'area': {
          'required': "Area cannot be blank"
        }
      };

      $scope.submitPropertyDetails = function(validState) {
        if (validState) {

          var urlData = "ListingMinimal[name]=" + $scope.name +
            "&ListingMinimal[mobile]=" + $scope.mobile +
            "&ListingMinimal[accommodationType]=" + $scope.propertyType +
            "&ListingMinimal[buildingName]=" + $scope.bName +
            "&ListingMinimal[location]=" + $scope.autocomplete +
            "&ListingMinimal[lat]=" + $scope.details.geometry.location.lat() +
            "&ListingMinimal[lng]=" + $scope.details.geometry.location.lng() +
            "&ListingMinimal[cityId]=" + 1;

          var response = ListyourpropService.submitPropertyDetails(urlData);
          if (response.success === true) {
            $scope.submitSuccess = true;
          }
        } else {
          $scope.formError = true;
        }
      };

      $scope.showlist = function() {};

    }
  ]);
