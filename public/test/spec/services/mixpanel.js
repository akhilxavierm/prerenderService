'use strict';

describe('Service: mixpanel', function () {

  // load the service's module
  beforeEach(module('waoApp'));

  // instantiate service
  var mixpanel;
  beforeEach(inject(function (_mixpanel_) {
    mixpanel = _mixpanel_;
  }));

  it('should do something', function () {
    expect(!!mixpanel).toBe(true);
  });

});
