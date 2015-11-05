'use strict';

describe('Controller: ServererrorController', function () {

  // load the controller's module
  beforeEach(module('waoApp'));

  var ServererrorController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ServererrorController = $controller('ServererrorController', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ServererrorController.awesomeThings.length).toBe(3);
  });
});
