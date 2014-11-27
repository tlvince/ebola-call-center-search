var assert = require('assert');
var loadView = require('./helper');
var doc = require('../examples/document/1.json');
var Document = require('./document');

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
    expected = "am mi in na at ta ami min ina nat ata amin mina inat nata amina minat inata aminat minata aminata ko ou ur ro ou um ma kou our uro rou oum uma kour ouro urou roum ouma kouro ourou uroum rouma kourou ouroum urouma kouroum ourouma kourouma"
    assert.equal(indexed, expected, JSON.stringify(indexed));
  });

  it('indexes contact_admindivision1 as labeled location', function() {
    var indexed = res.internal.contact_admindivision1.value;
    expected = "co on na ak kr ry con ona nak akr kry cona onak nakr akry conak onakr nakry conakr onakry conakry";
    assert.equal(indexed, expected, JSON.stringify(indexed));
  });

  it('indexes contact_admindivision2 as labeled location', function() {
    var indexed = res.internal.contact_admindivision2.value;
    expected = "co on na ak kr ry con ona nak akr kry cona onak nakr akry conak onakr nakry conakr onakry conakry";
    assert.equal(indexed, expected, JSON.stringify(indexed));
  });

  it('indexes contact_admindivision3, which is undefined, as ngram undefined', function() {
    var indexed = res.internal.contact_admindivision3.value;
    expected = "undefined";
    assert.equal(indexed, expected, JSON.stringify(indexed));
  });
});
