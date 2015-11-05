'use strict';

describe('Service: ShortListService', function () {

  // load the service's module
  beforeEach(module('waoApp'));

  // instantiate service
  var ShortListService;
  beforeEach(inject(function (_ShortListService_) {
    ShortListService = _ShortListService_;
  }));

  it('should do something', function () {
    expect(!!ShortListService).toBe(true);
  });

});
