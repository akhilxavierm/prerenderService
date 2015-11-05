'use strict';

/**
 * @ngdoc service
 * @name waoApp.authentication
 * @description
 * # authentication
 * Service in the waoApp.
 */
angular.module('waoApp')
  .service('authentication', ['$http', '$window', '$q', '$rootScope', '$stateHandle', 'commonFactoryMethods', 'GH_SOCIAL',
    function($http, $window, $q, $rootScope, $stateHandle, commonFactoryMethods, GH_SOCIAL) {

      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "https://platform.linkedin.com/in.js?async=true";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'linkedin-jssdk'));

      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "https://apis.google.com/js/client:plusone.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'googlePlus-jssdk'));

      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));

      $window.fbAsyncInit = function() {
        FB.init({
          appId: GH_SOCIAL.FACEBOOK_APP_ID,
          cookie: true,
          status: true,
          xfbml: true,
          version: 'v2.5'
        }, {
          scope: 'email'
        });

        IN.init({
          api_key: GH_SOCIAL.LINKEDIN_APP_KEY,
          authorize: true
        });
      };

      var auth = {
        grabhouseSignIn: function(form) {
          return $http({
            method: 'POST',
            url: '/user-registration/login',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: form
          });
        },

        grabhouseSignUp: function(form) {
          return $http({
            method: 'POST',
            url: '/user-registration',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: form
          });
        },

        facebookSignIn: function(callbackfn) {
          if (FB) {
            var deferred = $q.defer();
            FB.login(function(response) {
              if (response.error) {
                deferred.reject(response.error);
              } else {
                deferred.resolve(response);
              }
              callbackfn(response);
            }, {
              scope: 'email'
            });
          }
        },

        linkedinSignIn: function(callbackfn) {
          if (IN) {
            if (IN.User.isAuthorized()) {
              callbackfn();
            } else {
              IN.User.authorize(callbackfn);
            }
          }
        },

        googlePlusSignIn: function(callbackfn) {
          var defaults = {
            cookie_policy: 'single_host_origin',
            scope: 'https://www.googleapis.com/auth/userinfo.profile',
            height: 'standard',
            width: 'wide',
            state: '',
            immediate: false,
            client_id: GH_SOCIAL.GOOGLE_PLUS_CLIENT_ID + '.apps.googleusercontent.com'
          };

          if (gapi) {
            gapi.auth.authorize(defaults, callbackfn);
          }
        },

        signOut: function() {
          if (gapi) {
            gapi.auth.signOut();
          }

          if (FB) {
            FB.getLoginStatus(function(response) {
              if (response.status === 'connected') {
                FB.logout(function(response) {
                  console.log("FB logged out", response);
                });
              }
            });
          }

          if (IN && IN.User && IN.User.isAuthorized()) {
            IN.User.logout(function(response) {
              console.log("LinkedIn logged out", response);
            });
          }

          $stateHandle.setUserAuth(false);

          return $http.get('/user-registration/logout');
        }
      };
      return auth;
    }
  ]);
