var assert = require('assert');
var loadView = require('../../shared/helpers/load_view');
var Document = require('../../shared/helpers/document');
var doc = require('../examples/document/1.json');

describe('index', function() {
  var f = loadView('couch/search/fulltext/all/index.js');
  var res = eval(f)(doc);
  var expected = '';
  it('indexes contact.createdOn as date lucene type', function() {
    var indexed = res.internal.contact_createdon.type;
    expected = 'date';
    assert.equal(indexed, expected, JSON.stringify(indexed));
  });

  it('indexes contact.createdOn as ngrams', function() {
    var indexed = res.internal.contact_name.value;
    expected = "FA AK KE FAK AKE FAKE na am me nam ame name";
    assert.equal(indexed, expected, JSON.stringify(indexed));
  });

  it('indexes contact_admindivision1 as labeled location', function() {
    var indexed = res.internal.contact_admindivision1.value;
    expected = "so ou ut th sou out uth sout outh south";
    assert.equal(indexed, expected, JSON.stringify(indexed));
  });

  it('indexes contact_admindivision2 as labeled location', function() {
    var indexed = res.internal.contact_admindivision2.value;
    expected = "bo";
    assert.equal(indexed, expected, JSON.stringify(indexed));
  });

  it('indexes response_admindivision3, which is undefined, as ngram undefined', function() {
    var indexed = res.internal.response_admindivision3.value;
    expected = "undefined";
    assert.equal(indexed, expected, JSON.stringify(indexed));
  });
});
