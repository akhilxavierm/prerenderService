'use strict';

describe('Controller: SitemapController', function () {

  // load the controller's module
  beforeEach(module('waoApp'));

  var SitemapController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SitemapController = $controller('SitemapController', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SitemapController.awesomeThings.length).toBe(3);
  });
});
