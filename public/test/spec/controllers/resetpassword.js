'use strict';

describe('Controller: ResetpasswordController', function () {

  // load the controller's module
  beforeEach(module('waoApp'));

  var ResetpasswordController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ResetpasswordController = $controller('ResetpasswordController', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ResetpasswordController.awesomeThings.length).toBe(3);
  });
});
