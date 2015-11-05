'use strict';

describe('Directive: ghoverlay', function () {

  // load the directive's module
  beforeEach(module('waoApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ghoverlay></ghoverlay>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the ghoverlay directive');
  }));
});
