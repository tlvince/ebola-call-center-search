var assert = require('assert');
var lookup = require('../../couch/search/vendor/locations/lookup');

describe('lookup.adaptedName', function() {

  it('finds the right name for code at level 0', function() {
    var res = lookup.adaptedName(0, 'C');
    assert.equal(res, "conakry", res);
  });

  it('finds the right name for code at level 1', function() {
    var res = lookup.adaptedName(1, 'BE');
    assert.equal(res, "beyla", res);
  });

  it('returns the id if no name found', function() {
    var id = "JNONE";
    var res = lookup.adaptedName(0, id);
    assert.equal(res, id, res);
  });

  it('undefined property is returned as undefined', function() {
    var id = "undefined";
    var res = lookup.adaptedName(2, id);
    assert.equal(res, id, res);
  });

});
