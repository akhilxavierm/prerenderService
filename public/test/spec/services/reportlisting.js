'use strict';

describe('Service: reportListing', function () {

  // load the service's module
  beforeEach(module('waoApp'));

  // instantiate service
  var reportListing;
  beforeEach(inject(function (_reportListing_) {
    reportListing = _reportListing_;
  }));

  it('should do something', function () {
    expect(!!reportListing).toBe(true);
  });

});
