var assert = require('assert');
var lookup = require('../couch/search/vendor/locations/lookup');

describe('lookup.name', function() {

  it('finds the right name for code at level 0', function() {
    var res = lookup.name(0, 'C');
    assert(res, "Conakry", res);
  });

  it('finds the right name for code at level 1', function() {
    var res = lookup.name(0, 'BE');
    assert(res, "beyla", res);
  });

  it('returns the id if no name found', function() {
    var id = "JNONE";
    var res = lookup.name(0, id);
    assert(res, id, res);
  });
});
