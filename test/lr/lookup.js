var assert = require('assert');
var lookup = require('../../couch/search/vendor/locations/lookup');

describe('lookup.name', function() {

  it('finds the right name for code at level 0', function() {
    var res = lookup.name(0, 1);
    assert.equal(res, "montserrado", res);
  });

  it('finds the right name for code at level 1', function() {
    var res = lookup.name(1, 1);
    assert.equal(res, "District #1", res);
  });

  it('there is no code at level 2', function() {
    var res = lookup.name(2, 1);
    assert.equal(res, "1", res);
  });

  it('returns the id if no name found', function() {
    var id = "JNONE";
    var res = lookup.name(0, id);
    assert.equal(res, id, res);
  });

  it('undefined property is returned as undefined', function() {
    var id = "undefined";
    var res = lookup.name(1, id);
    assert.equal(res, id, res);
  });

});
