'use strict';

describe('Filter: ghSearchTimeFormat', function () {

  // load the filter's module
  beforeEach(module('waoApp'));

  // initialize a new instance of the filter before each test
  var ghSearchTimeFormat;
  beforeEach(inject(function ($filter) {
    ghSearchTimeFormat = $filter('ghSearchTimeFormat');
  }));

  it('should return the input prefixed with "ghSearchTimeFormat filter:"', function () {
    var text = 'angularjs';
    expect(ghSearchTimeFormat(text)).toBe('ghSearchTimeFormat filter: ' + text);
  });

});
