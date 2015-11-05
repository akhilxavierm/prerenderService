'use strict';

describe('Filter: formatmoney', function () {

  // load the filter's module
  beforeEach(module('waoApp'));

  // initialize a new instance of the filter before each test
  var formatmoney;
  beforeEach(inject(function ($filter) {
    formatmoney = $filter('formatmoney');
  }));

  it('should return the input prefixed with "formatmoney filter:"', function () {
    var text = 'angularjs';
    expect(formatmoney(text)).toBe('formatmoney filter: ' + text);
  });

});
