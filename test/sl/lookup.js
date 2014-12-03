var assert = require('assert');
var lookup = require('../../couch/search/vendor/locations/lookup');
var obj = {
    "patient": {
        "adminDivision1": "undefined",
        "adminDivision2": "undefined",
        "adminDivision3": "undefined"
    },
    "contact": {
        "adminDivision1": "undefined",
        "adminDivision2": "undefined",
        "adminDivision3": "undefined"
    },
    "response": {
        "adminDivision1": "undefined",
        "adminDivision2": "undefined",
        "adminDivision3": "undefined"
    }
}


describe('lookup.adaptedName', function() {

  it('finds the country', function() {
    assert.equal('sl', lookup.country);
  });

  it('finds the right name for code at level 0', function() {
    var res = lookup.adaptedName(0, 'S', {});
    assert.equal(res, "south", res);
  });

  it('finds the right name for code at level 1', function() {
    var res = lookup.adaptedName(1, '1', {});
    assert.equal(res, "bo", res);
  });

  it('returns the id if no name found', function() {
    var id = "JNONE", res;
    [0,1,2].forEach(function(x) {
      res = lookup.adaptedName(x, id, {});
      assert.equal(res, id, res);
    });
  });

  it('undefined property is returned as undefined', function() {
    var id = "undefined", res;
    [0,1,2].forEach(function(x) {
      res = lookup.adaptedName(x, id, {});
      assert.equal(res, id, res);
    });
  });
});
