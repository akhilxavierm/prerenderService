'use strict';

describe('Directive: ghnotifications', function () {

  // load the directive's module
  beforeEach(module('waoApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ghnotifications></ghnotifications>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the ghnotifications directive');
  }));
});
