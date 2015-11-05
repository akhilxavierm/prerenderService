'use strict';

describe('Service: socialauth', function () {

  // load the service's module
  beforeEach(module('waoApp'));

  // instantiate service
  var socialauth;
  beforeEach(inject(function (_socialauth_) {
    socialauth = _socialauth_;
  }));

  it('should do something', function () {
    expect(!!socialauth).toBe(true);
  });

});
