'use strict';

describe('Controller: ListyourpropertyController', function () {

  // load the controller's module
  beforeEach(module('waoApp'));

  var ListyourpropertyController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ListyourpropertyController = $controller('ListyourpropertyController', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ListyourpropertyController.awesomeThings.length).toBe(3);
  });
});
