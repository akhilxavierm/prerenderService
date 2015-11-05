'use strict';

describe('Service: sitemap', function () {

  // load the service's module
  beforeEach(module('waoApp'));

  // instantiate service
  var sitemap;
  beforeEach(inject(function (_sitemap_) {
    sitemap = _sitemap_;
  }));

  it('should do something', function () {
    expect(!!sitemap).toBe(true);
  });

});
