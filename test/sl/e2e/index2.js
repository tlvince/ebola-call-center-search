var assert = require('assert');
var loadView = require('../../shared/helpers/load_view');
var Document = require('../../shared/helpers/document');
var doc2 = require('../examples/document/2.json');

describe('index with padded string', function() {
  var f = loadView('couch/search/fulltext/all/index.js');
  var res = eval(f)(doc2);
  var expected = '';
  it('indexes patient_admindivision1 as labeled location when it is a padded string', function() {
    var indexed = res.internal.contact_admindivision1.value;
    expected = "south";
    assert.equal(indexed, expected, JSON.stringify(indexed));
  });

  it('indexes patient_admindivision2 as labeled location when it is a padded string', function() {
    var indexed = res.internal.contact_admindivision2.value;
    expected = "bo";
    assert.equal(indexed, expected, JSON.stringify(indexed));
  });

  it('indexes patient_admindivision3 as labeled location when it is a padded string', function() {
    var indexed = res.internal.patient_admindivision3.value;
    expected = "selenga";
    assert.equal(indexed, expected, JSON.stringify(indexed));
  });

  it('indexes contact_admindivision1', function() {
    var indexed = res.internal.contact_admindivision1.value;
    expected = "south";
    assert.equal(indexed, expected, JSON.stringify(indexed));
  });

  it('indexes contact_admindivision2, which has form d', function() {
    var indexed = res.internal.contact_admindivision2.value;
    expected = "bo";
    assert.equal(indexed, expected, JSON.stringify(indexed));
  });

  it('indexes contact_admindivision3, which has form d-dd', function() {
    var indexed = res.internal.contact_admindivision3.value;
    expected = "baoma";
    assert.equal(indexed, expected, JSON.stringify(indexed));
  });

  it('indexes response_admindivision1, which is undefined, as undefined', function() {
    var indexed = res.internal.response_admindivision1.value;
    expected = "undefined";
    assert.equal(indexed, expected, JSON.stringify(indexed));
  });

  it('indexes response_admindivision2, which is undefined, as undefined', function() {
    var indexed = res.internal.response_admindivision2.value;
    expected = "kailahun";
    assert.equal(indexed, expected, JSON.stringify(indexed));
  });

  it('indexes response_admindivision3, which is undefined, as undefined', function() {
    var indexed = res.internal.response_admindivision3.value;
    expected = "jaluahun";
    assert.equal(indexed, expected, JSON.stringify(indexed));
  });
});
