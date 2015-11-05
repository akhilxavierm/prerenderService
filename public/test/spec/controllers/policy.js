'use strict';

describe('Controller: PolicyController', function () {

  // load the controller's module
  beforeEach(module('waoApp'));

  var PolicyController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PolicyController = $controller('PolicyController', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PolicyController.awesomeThings.length).toBe(3);
  });
});
