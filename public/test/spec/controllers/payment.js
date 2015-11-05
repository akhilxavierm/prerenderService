'use strict';

describe('Controller: PaymentController', function () {

  // load the controller's module
  beforeEach(module('waoApp'));

  var PaymentController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PaymentController = $controller('PaymentController', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PaymentController.awesomeThings.length).toBe(3);
  });
});
