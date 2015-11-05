'use strict';

/**
 * @ngdoc directive
 * @name waoApp.directive:ghcontactownerbtn
 * @description
 * # ghcontactownerbtn
 */
angular.module('waoApp')
  .directive('ghContactOwnerBtn', ['$rootScope', '$location', '$stateHandle', 'ContactService', 'GH_EVENTS',
    function($rootScope, $location, $stateHandle, ContactService, GH_EVENTS) {
      return {
        templateUrl: 'views/gh-contact-owner-btn.html',
        restrict: 'E',
        controller: ['$scope', function($scope) {

          $scope.contactOwner = function(listing) {
            if ($stateHandle.getUserAuth()) {
              if (!listing) {
                listing = $scope.listingInfo;
              }

              ContactService.contactOwner(listing.id).success(function() {
                var balloon = {
                  "_id": "-1",
                  "type": 4,
                  "status": 0,
                  "content": {
                    "text": {
                      "head": "Contact sent to +91 9999888877",
                      "body": $scope.listingInfo.details.title,
                      "footer": {
                        "rent": $scope.listingInfo.details.rent,
                        "location": $scope.listingInfo.details.location.name
                      }
                    },
                    "action": {
                      "url": "/moreinfo",
                      "id": $scope.listingInfo.id
                    }
                  },
                  "addedOn": ""
                };

                $rootScope.$broadcast(GH_EVENTS.SHOW_OVERLAY, "Show overlay");
                $rootScope.$broadcast(GH_EVENTS.SHOW_CONTACT_OWNER, balloon);
              });

            } else {
              $location.url("/user/signin");
            }

            //Below block to be implemented once the backend APIs are in place

            // if(user.login == true){
            //     ContactService.contactOwner($scope.listingInfo.id).success(function(data){

            //         if (data.success == false) {
            //             if (data.code == '7' || data.code == '8') {
            //                 if (!userService.getPaidStatus()) {
            //                     if (data.code == '7') {
            //                         listingObject = {
            //                             "_id": "-1",
            //                             "type": 6,
            //                             "status": 0,
            //                             "content": {
            //                                 "text": {
            //                                     "head": "You have used all your free contacts",
            //                                     "footer": "Get three contact for Rs 49."
            //                                 },
            //                                 "action": {
            //                                     "amount": "49"
            //                                 }
            //                             },
            //                             "addedOn": ""
            //                         };
            //                     }
            //                     if (data.code == '8') {
            //                         listingObject = {
            //                             "_id": "-1",
            //                             "type": 14,
            //                             "status": 0,
            //                                 "content": {
            //                                     "text": {
            //                                         "head": "Want to contact one more owner for FREE?",
            //                                         "body": null,
            //                                         "footer": "Post your requirement today!"
            //                                     },
            //                                     "action": null
            //                                 },
            //                                 "addedOn": ""
            //                             };
            //                         }
            //                         $rootScope.$emit(gbConstant.SIGNAL.SHOW_BALLOON, listingObject);
            //                     }
            //                 } else {
            //                     if (data.code == '7') {
            //                         listingObject = {
            //                             "type": 4
            //                         };
            //                     } else {
            //                         listingObject = {
            //                             "_id": "-1",
            //                             "type": 14,
            //                             "status": 0,
            //                             "content": {
            //                                 "text": {
            //                                     "head": "Want to contact one more owner for FREE?",
            //                                     "body": null,
            //                                     "footer": "Post your requirement today!"
            //                                 },
            //                                 "action": null
            //                             },
            //                             "addedOn": ""
            //                         };
            //                     }
            //                     $rootScope.$emit(gbConstant.SIGNAL.SHOW_BALLOON, listingObject);
            //                 }
            //             } else if (data.success == true) {
            //                 if (data.code == '3') {
            //                     $scope.contacted = true;
            //                     $scope.message = "We have already sent the owner details to your mobile.";
            //                     $scope.$emit("show", "show from triggered ->" + $element);
            //                 } else if (data.code === undefined) {

            //                     listingObject = {
            //                         "_id": "-1",
            //                         "type": 4,
            //                         "status": 0,
            //                         "content": {
            //                             "text": {
            //                                 "head": "Contact sent to +91 " + userData.mobile,
            //                                 "body": $scope.listingInfo.details.title,
            //                                 "footer": {
            //                                     "rent": $scope.listingInfo.details.rent,
            //                                     "location": $scope.listingInfo.details.location.name
            //                                 }
            //                             },
            //                             "action": {
            //                                 "url": "/listing/" + $scope.listingInfo.id,
            //                                 "id": $scope.listingInfo.id
            //                             }
            //                         },
            //                         "addedOn": ""
            //                     };
            //                     $rootScope.$emit(gbConstant.SIGNAL.SHOW_BALLOON, listingObject);

            //                     $scope.contacted = true;
            //                     $scope.message = "We have sent the owner details to your mobile.";
            //                     $scope.$emit("show", "show from triggered ->" + $element);
            //                 }
            //             }

            //     });
            // }else{
            //     $location.url("/user/signin");
            // }

          };
        }]
      };
    }
  ]);
