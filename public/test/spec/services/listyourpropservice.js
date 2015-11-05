'use strict';

describe('Service: ListyourpropService', function () {

  // load the service's module
  beforeEach(module('waoApp'));

  // instantiate service
  var ListyourpropService;
  beforeEach(inject(function (_ListyourpropService_) {
    ListyourpropService = _ListyourpropService_;
  }));

  it('should do something', function () {
    expect(!!ListyourpropService).toBe(true);
  });

});
