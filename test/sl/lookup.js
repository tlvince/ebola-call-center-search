var assert = require('assert');
var lookup = require('../../couch/search/vendor/locations/lookup');

describe('lookup.name', function() {

  it('finds the right name for code at level 0', function() {
    var res = lookup.name(0, 'S');
    assert.equal(res, "south", res);
  });

  it('finds the right name for code at level 1', function() {
    var res = lookup.name(1, '1');
    assert.equal(res, "bo", res);
  });

  it('returns the id if no name found', function() {
    var id = "JNONE";
    var res = lookup.name(0, id);
    assert.equal(res, id, res);
  });

  it('undefined property is returned as undefined', function() {
    var id = "undefined";
    var res = lookup.name(2, id);
    assert.equal(res, id, res);
  });

});
