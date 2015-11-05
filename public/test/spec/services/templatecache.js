'use strict';

describe('Service: templateCache', function () {

  // load the service's module
  beforeEach(module('waoApp'));

  // instantiate service
  var templateCache;
  beforeEach(inject(function (_templateCache_) {
    templateCache = _templateCache_;
  }));

  it('should do something', function () {
    expect(!!templateCache).toBe(true);
  });

});
