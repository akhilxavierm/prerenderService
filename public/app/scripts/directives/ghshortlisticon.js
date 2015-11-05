'use strict';

/**
 * @ngdoc directive
 * @name waoApp.directive:ghShortListIcon
 * @description
 * # ghShortListIcon
 */
angular.module('waoApp')
  .directive('ghShortListIcon', ['$http', '$rootScope', 'ShortListService', 'GH_EVENTS', function($http, $rootScope, ShortListService, GH_EVENTS) {
    return {
      replace: true,
      templateUrl: 'views/gh-short-list-icon.html',
      restrict: 'E',
      controller: ['$scope', '$element', function($scope, $element) {
        $scope.updateShortList = function(listingInfo, $event) {
          $event.stopPropagation();
          if (!listingInfo) {
            listingInfo = $scope.listingInfo;
          }

          var listingid = listingInfo.id;

          if ($element.hasClass('active')) {
            ShortListService.updateShortListActivity(listingid, '0').success(function() {
              $element.removeClass('active');
            });
          } else {
            $element.addClass('active');
            ShortListService.updateShortListActivity(listingid, '1').success(function() {
              var balloon = {
                "_id": listingid,
                "type": 9,
                "status": 0,
                "content": {
                  "text": {
                    "head": "Property shortlisted",
                    "body": listingInfo.details.title,
                    "footer": {
                      "rent": listingInfo.details.rent,
                      "location": listingInfo.details.location.name
                    }
                  },
                  "action": {
                    "url": "/moreinfo",
                    "id": listingInfo.id
                  }
                },
                "addedOn": ""
              };
              $rootScope.$broadcast(GH_EVENTS.SHOW_NOTIFICATION, balloon);

            });

          }
        };
      }]
    };

  }]);
