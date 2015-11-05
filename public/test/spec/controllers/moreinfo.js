'use strict';

describe('Controller: MoreinfoController', function () {

  // load the controller's module
  beforeEach(module('waoApp'));

  var MoreinfoController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MoreinfoController = $controller('MoreinfoController', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MoreinfoController.awesomeThings.length).toBe(3);
  });
});
