'use strict';

describe('Controller: UnsubscribeController', function () {

  // load the controller's module
  beforeEach(module('waoApp'));

  var UnsubscribeController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UnsubscribeController = $controller('UnsubscribeController', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(UnsubscribeController.awesomeThings.length).toBe(3);
  });
});
