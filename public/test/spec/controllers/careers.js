'use strict';

describe('Controller: CareersController', function () {

  // load the controller's module
  beforeEach(module('waoApp'));

  var CareersController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CareersController = $controller('CareersController', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CareersController.awesomeThings.length).toBe(3);
  });
});
