'use strict';

describe('Service: userdata', function () {

  // load the service's module
  beforeEach(module('waoApp'));

  // instantiate service
  var userdata;
  beforeEach(inject(function (_userdata_) {
    userdata = _userdata_;
  }));

  it('should do something', function () {
    expect(!!userdata).toBe(true);
  });

});
