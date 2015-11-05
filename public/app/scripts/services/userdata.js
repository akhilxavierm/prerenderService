'use strict';

/**
 * @ngdoc service
 * @name waoApp.user
 * @description
 * # user
 * Service in the waoApp.
 */
angular.module('waoApp')
  .service('user', ['$http', '$localStorage', '$stateHandle', 'authentication',
    function($http, $localStorage, $stateHandle, authentication) {
      var userData = {
        firstName: "",
        lastName: "",
        displayName: "",
        gender: "",
        avatarUrl: "",
        email: "",
        mobile: "",
        profession: "",
        company: "",
        isGuest: true
      };

      var userService = {
        getData: function() {
          userData = {
            firstName: "",
            lastName: "",
            displayName: "",
            gender: "",
            avatarUrl: "",
            email: "",
            mobile: "",
            profession: "",
            company: "",
            isGuest: true
          };
          return $localStorage.get('USER') || userData;
        },
        setData: function(userData) {
          $localStorage.set('USER', userData);
        },
        clearData: function() {
          $localStorage.removeOne('USER');
        },
        getGender: function(gender) {
          return gender === 'male' ? 1 : 0;
        },
        transformGooglePlusData: function(data) {
          var resp = data.result;
          userData.firstName = resp.name.givenName;
          userData.lastName = resp.name.familyName;
          userData.displayName = resp.displayName;
          userData.gender = this.getGender(resp.gender);
          userData.avatarUrl = resp.image.url;
          userData.email = resp.emails[0].value;
          userData.mobile = "";
          userData.isGuest = false;

          this.setData(userData);
        },
        transformFacebookData: function(resp) {
          userData.firstName = resp.first_name;
          userData.lastName = resp.last_name;
          userData.displayName = userData.firstName + ' ' + userData.lastName;
          userData.gender = this.getGender(resp.gender);
          userData.avatarUrl = resp.picture.data.url;
          userData.email = resp.email;
          userData.mobile = "";
          userData.isGuest = false;

          this.setData(userData);
        },
        transformLinkedInData: function(data) {
          var resp = data.values[0];
          userData.firstName = resp.firstName;
          userData.lastName = resp.lastName;
          userData.displayName = userData.firstName + ' ' + userData.lastName;
          userData.gender = "";
          userData.avatarUrl = resp.pictureUrls.values !== undefined ? resp.pictureUrls.values[0] : "../images/male.png";
          userData.email = resp.emailAddress;
          userData.mobile = "";
          userData.isGuest = false;

          this.setData(userData);
        },
        transformGrabhouseData: function(resp) {
          userData.firstName = resp.firstName;
          userData.lastName = resp.lastName;
          userData.displayName = userData.firstName + ' ' + userData.lastName;
          userData.gender = resp.gender;
          userData.avatarUrl = resp.avatarUrl !== null ? resp.avatarUrl : "../images/male.png";
          userData.email = resp.email;
          userData.mobile = resp.mobile;
          userData.profession = resp.profession;
          userData.company = resp.company;
          userData.isGuest = false;

          this.setData(userData);
        },
        googleplusSignIn: function(callbackfn) {
          var self = this;
          authentication.googlePlusSignIn(function(authResult) {
            if (gapi && authResult && !authResult.error) {
              gapi.client.load('plus', 'v1', function() {
                gapi.client.plus.people.get({
                  userId: 'me'
                }).then(function(resp) {
                  self.transformGooglePlusData(resp);
                  callbackfn();
                });
              });
            } else {
              console.log(authResult);
            }

          });
        },
        facebookSignIn: function(callbackfn) {
          var self = this;
          authentication.facebookSignIn(function(response) {
            if (FB && response.status === 'connected') {
              FB.api('/me', {
                  fields: 'first_name, last_name, email, gender, age_range, birthday, work, education, picture, languages'
                },
                function(resp) {
                  self.transformFacebookData(resp);
                  callbackfn();
                });
            } else {
              console.log(response.status);
              // FB.login(function(response) {
              //   console.log(response);
              // }, {
              //   scope: 'email'
              // });
            }
          });
        },
        linkedinSignIn: function(callbackfn) {
          var self = this;
          authentication.linkedinSignIn(function(response) {
            console.log(response);
            if (IN) {
              IN.API.Profile("me")
                .fields('id', 'first-name', 'last-name', 'location', 'industry', 'headline', 'picture-urls::(original)', 'email-address')
                .result(function(resp) {
                  self.transformLinkedInData(resp);
                  callbackfn();
                })
                .error(function(err) {
                  console.log(err);
                });
            }
          });
        },
        grabhouseSignIn: function(data, callbackfn) {
          var self = this;
          var urlData = "UserLogin[password]=" + data.password + "&UserLogin[userName]=" + data.userid,
            form = {
              data: urlData,
              rememberMe: true
            };

          authentication.grabhouseSignIn(form)
            .success(function(response) {
              if (response.success === true) {
                self.transformGrabhouseData(response.data);
                callbackfn();
              } else {
                if (response.data.code === "3") {
                  data.loginFailError = true;
                }
              }
            }).error(function(error) {
              console.log(error);
            });
        },
        grabhouseSignUp: function(data, callbackfn) {
          var self = this;
          var urlData = {
              'gender': data.gender,
              'password': data.password,
              'emailAddress': data.emailAddress,
              'mobile': data.mobile,
              'lastName': data.lastName,
              'firstName': data.firstName
            },
            form = {
              data: {
                UserLogin: urlData
              }
            };

          authentication.grabhouseSignUp(form)
            .success(function(response) {
              if (response.success === false) {
                data.errors.usedEmailError = response.data.email || '';
                data.errors.usedMobileError = response.data.mobile || '';
              } else {
                self.transformGrabhouseData(response.data);
                callbackfn();
              }
            }).error(function(resonse) {
              console.log(resonse);
            });
        },
        SignOut: function(callbackfn) {
          var self = this;
          authentication.signOut().then(function(response) {
            //console.log(response);
            self.clearData();
            console.log("Clear Local Storage");
            callbackfn();
          }, function(response) {
            console.log(response);
          });
        },
        unsubscribe: function(authkey) {
          return $http.get("/user/unsubscribe?u=" + authkey);
        },
        forgotpassword: function(form) {
          return $http({
            method: 'POST',
            url: '/user-registration/send-forgot-password-email',
            transformRequest: function(obj) {
              var str = [];
              for (var p in obj) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
              }
              return str.join("&");
            },
            data: form,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          });
        },
        resetpassword: function(data) {
          return $http({
            method: 'POST',
            url: '/user-reset-password/reset-password',
            data: {
              UserLogin: {
                password: data.password,
                confirmPassword: data.confirmPassword,
                authKey: data.authkey
              }
            },
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          });
        },
        uploadimages: function(data) {
          return $http.post('/user/profile-image-preview', data, {
            headers: {
              'Content-Type': undefined
            },
            transformRequest: angular.identity
          });
        },
        saveprofile: function(userdata) {
          return $http({
            method: 'POST',
            url: '/user/save-profile',
            data: userdata,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
          });
        }
      };
      return userService;
    }
  ]);
