'use strict';

describe('Service: listingResults', function () {

  // load the service's module
  beforeEach(module('waoApp'));

  // instantiate service
  var listingResults;
  beforeEach(inject(function (_listingResults_) {
    listingResults = _listingResults_;
  }));

  it('should do something', function () {
    expect(!!listingResults).toBe(true);
  });

});
