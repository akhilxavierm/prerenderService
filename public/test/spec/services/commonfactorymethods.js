'use strict';

describe('Service: commonFactoryMethods', function () {

  // load the service's module
  beforeEach(module('waoApp'));

  // instantiate service
  var commonFactoryMethods;
  beforeEach(inject(function (_commonFactoryMethods_) {
    commonFactoryMethods = _commonFactoryMethods_;
  }));

  it('should do something', function () {
    expect(!!commonFactoryMethods).toBe(true);
  });

});
