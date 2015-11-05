'use strict';

describe('Directive: ghContactDetails', function () {

  // load the directive's module
  beforeEach(module('waoApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<gh-contact-details></gh-contact-details>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the ghContactDetails directive');
  }));
});
