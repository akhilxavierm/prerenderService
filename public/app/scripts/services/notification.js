'use strict';

/**
 * @ngdoc service
 * @name waoApp.notification
 * @description
 * # notification
 * Service in the waoApp.
 */
angular.module('waoApp')
  .service('notification', ['commonFactoryMethods', function(commonFactoryMethods) {
    var notificationService = {
      getLeads: commonFactoryMethods.requestCall({
        method: 'GET',
        url: "/seeker/leads-available"
      }),
      getNotificationCount: commonFactoryMethods.requestCall({
        method: 'GET',
        url: "/notification/count"
      }),
      getNotifications: commonFactoryMethods.requestCall({
        method: 'GET',
        url: "/notification/get"
      }),
      setNotificationRead: function(notification_id) {
        return $http.get('/notification/set-read?_id=' + notification_id);
      }
    };
    return notificationService;

  }]);
