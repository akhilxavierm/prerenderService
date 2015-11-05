'use strict';

describe('Filter: ghdateformat', function () {

  // load the filter's module
  beforeEach(module('waoApp'));

  // initialize a new instance of the filter before each test
  var ghdateformat;
  beforeEach(inject(function ($filter) {
    ghdateformat = $filter('ghdateformat');
  }));

  it('should return the input prefixed with "ghdateformat filter:"', function () {
    var text = 'angularjs';
    expect(ghdateformat(text)).toBe('ghdateformat filter: ' + text);
  });

});
