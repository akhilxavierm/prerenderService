'use strict';

/**
 * @ngdoc overview
 * @name waoApp
 * @description
 * # waoApp
 *
 * Main module of the application.
 */
angular
  .module('waoApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'stateHandler',
    'localStorage',
    'ngAutocomplete',
    'ui.bootstrap',
    'staticContent',
    'ngScrollbar',
    'ds.map'
  ])
  .constant("GH_EVENTS", {
    "SHOW_OVERLAY": "showOverlay",
    "HIDE_OVERLAY": "hideOverlay",
    "CLOSE_ALL": "closeAll",
    "SHOW_CONTACT_OWNER": "showContactOwner",
    "SHOW_NOTIFICATION": "showNotification",
    "HIDE_NOTIFICATION": "hideNotification"
  })
  .constant('GH_SOCIAL', {
    "GOOGLE_PLUS_CLIENT_ID": "googleclientid",
    "FACEBOOK_APP_ID": "facebookappid",
    "LINKEDIN_APP_KEY": "linkedinapikey"
  })
  .config(['$compileProvider', '$stateHandleProvider', '$localStorageProvider', '$staticContentProvider',
    function($compileProvider, $stateHandleProvider, $localStorageProvider, $staticContentProvider) {
      $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
      $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|tel|ftp|file|blob|content|ms-appx|x-wmapp0):|data:image\//);
      $compileProvider.debugInfoEnabled(false);
      $localStorageProvider.setPrefix('gh');
      $staticContentProvider.setUrl('../data/newsandtestimonials.json');

      $stateHandleProvider
        .when('/', {
          templateUrl: 'views/home.html',
          title: 'Flats,PG,House for rent without broker | Grabhouse',
          controller: 'HomeController',
          controllerAs: 'home'
        })
        .when('/search/:view?/:slug?', {
          templateUrl: 'views/search.html',
          title: 'Search | Grabhouse',
          controller: 'SearchController',
          controllerAs: 'search',
        })
        .when('/listing/property', {
          templateUrl: 'views/list-your-property.html',
          title: 'Post your property to find broker free tenants & flatmates | Grabhouse',
          controller: 'ListYourPropertyController',
          controllerAs: 'listproperty'
        })
        .when('/careers', {
          templateUrl: 'views/careers.html',
          title: 'Careers | Grabhouse',
          controller: 'CareersController',
          controllerAs: 'careers'
        })
        .when('/contact', {
          templateUrl: 'views/contact.html',
          title: 'Contact | Grabhouse',
          controller: 'ContactController',
          controllerAs: 'contact'
        })
        .when('/sitemap', {
          templateUrl: 'views/sitemap.html',
          title: 'Sitemap | Grabhouse',
          controller: 'SitemapController',
          controllerAs: 'sitemap'
        })
        .when('/sitemap-:citykey', {
          templateUrl: 'views/sitemap.html',
          title: 'Sitemap | Grabhouse',
          controller: 'SitemapController',
          controllerAs: 'sitemap'
        })
        .when('/termsandconditions', {
          templateUrl: 'views/policy.html',
          title: 'Terms & Conditions | Grabhouse',
          controller: 'PolicyController',
          controllerAs: 'policy'
        })
        .when('/privacy', {
          templateUrl: 'views/policy.html',
          type: 'privacy',
          title: 'Privacy | Grabhouse',
          controller: 'PolicyController',
          controllerAs: 'policy'
        })
        .when('/about', {
          title: 'About | Grabhouse',
          templateUrl: 'views/about.html',
          controller: 'AboutController',
          controllerAs: 'about'
        })
        .when('/moreinfo', {
          templateUrl: 'views/more-info.html',
          controller: 'MoreinfoController',
          controllerAs: 'moreinfo'
        })
        .when('/not-found', {
          title: 'Not Found | Grabhouse',
          templateUrl: 'views/not-found.html',
          controller: 'NotfoundController',
          controllerAs: 'notfound'
        })
        .when('/server-error', {
          title: 'Server Error| Grabhouse',
          templateUrl: 'views/server-error.html',
          controller: 'ServererrorController',
          controllerAs: 'servererror'
        })
        .when('/user/unsubscribe', {
          title: 'Unsubscribe | Grabhouse',
          templateUrl: 'views/unsubscribe.html',
          controller: 'UnsubscribeController',
          controllerAs: 'unsubscribe'
        })
        .when('/user/reset-password', {
          title: 'Reset Password| Grabhouse',
          templateUrl: 'views/reset-password.html',
          controller: 'ResetpasswordController',
          controllerAs: 'resetpassword'
        })
        .when('/incentivisation/owner-details', {
          title: 'Provide Owner Details | Grabhouse',
          authentication: true
        })
        .when('/user/profile', {
          title: 'Account Settings | Grabhouse',
          authentication: true
        })
        .when('/user/:auth?', {})
        .noAuth('/user/signin', {
          title: 'Sign In | Grabhouse'
        })
        .otherwise({
          redirectTo: '/not-found'
        });
    }
  ]).run(['$rootScope', '$route', '$http', 'templateCache', function($rootScope, $route, $http, templateCache) {

    // $rootScope.$on('$routeChangeStart', function(evnt, state) {
    //   var n = state.$$route;
    //   if ($templateCache.get(n.templateUrl)) {
    //     console.log('From Cache');
    //     return;
    //   }
    //   $http.get(n.templateUrl).success(function(t) {
    //     console.log('Append Cache');
    //     console.log(n.templateUrl);
    //     $templateCache.put(n.templateUrl, t);
    //   });
    // });

    $rootScope.$on('$routeChangeSuccess', function() {
      if ($route.current.title !== undefined) {
        document.title = $route.current.title;
      }
    });

    var list = ["/views/search.html", "/views/list-your-property.html"];
    templateCache.doWork(list);
  }]);
