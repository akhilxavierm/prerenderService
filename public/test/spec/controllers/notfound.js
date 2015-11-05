'use strict';

describe('Controller: NotfoundController', function () {

  // load the controller's module
  beforeEach(module('waoApp'));

  var NotfoundController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NotfoundController = $controller('NotfoundController', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(NotfoundController.awesomeThings.length).toBe(3);
  });
});
