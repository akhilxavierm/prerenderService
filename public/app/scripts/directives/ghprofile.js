'use strict';

/**
 * @ngdoc directive
 * @name waoApp.directive:ghProfile
 * @description
 * # ghProfile
 */
angular.module('waoApp')
  .directive('ghProfile', ['$stateHandle', 'user', function($stateHandle, user) {
    return {
      templateUrl: 'views/gh-profile.html',
      restrict: 'E',
      controller: ['$scope', function($scope) {
        var isUrlAbsolute = new RegExp('^(https?:)?//');
        $scope.imageuploading = false;
        var avatarUrl;
        $scope.submitted = false;
        $scope.errors = {};
        $scope.profileData = {};
        $scope.profileData = user.getData();

        $scope.$watch('userData.gender', function(value) {
          if (value === undefined || isUrlAbsolute.test($scope.profileData.avatarUrl)) {
            return;
          }
          var val = parseInt(value);
          avatarUrl = (val === 0) ? '../images/female.png' : '../images/male.png';
          avatarUrl = avatarUrl;
          $scope.profileData.avatarUrl = avatarUrl;
        }, true);

        $scope.closeProfileModal = function() {
          $scope.profileActive = false;
          $scope.overlayActive = false;
          if ($scope.profileForm) {
            $scope.profileForm.$submitted = false;
          }
          $stateHandle.resetRoute();
        };

        $scope.update = function(isValid) {
          $scope.errors.duplicatePhone = '';
          $scope.errors.duplicateEmail = '';

          if (isValid) {
            var data = {
              seekerAvatarUrl: isUrlAbsolute.test($scope.profileData.avatarUrl) ? $scope.profileData.avatarUrl : null,
              seekerCompany: $scope.profileData.company,
              seekerProfession: $scope.profileData.profession,
              seekerGender: $scope.profileData.gender,
              seekerMobile: $scope.profileData.mobile,
              seekerEmail: $scope.profileData.email,
              seekerName: $scope.profileData.firstName + " " + $scope.profileData.lastName
            };

            user.saveprofile(data).success(function(response) {
              if (response.success) {
                $scope.formPostSuccess = true;
                user.setData($scope.profileData);
              } else {
                $scope.submitted = true;

                if (response.errors.mobileError) {
                  if (response.errors.mobileError.mobile) {
                    $scope.errors.duplicatePhone = response.errors.mobileError.mobile[0];
                  }
                }
                if (response.errors.emailError) {
                  if (response.errors.emailError.email) {
                    $scope.errors.duplicateEmail = response.errors.emailError.email[0];
                  }
                }
              }
            }).error(function(error) {
              $scope.formPostSuccess = false;
              console.log(error);
            });
          } else {
            $scope.submitted = true;
          }
        };

        $scope.uploadFile = function(files) {
          var fd = new FormData();
          fd.append("file", files[0]);
          fd.append("fieldName", "file");
          $scope.imageuploading = true;

          user.uploadimages(fd).
          success(function(response) {
            $scope.closeProfileModal();
            $scope.formPostSuccess = true;
            $scope.imageuploading = false;
            $scope.profileData.avatarUrl = response.image;
          }).error(function() {
            console.log("Error in image upload");
          });
        };
      }]
    };
  }]);
