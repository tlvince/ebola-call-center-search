var assert = require('assert');
var doc = require('../examples/document/1.json');
var loadView = require('../../shared/helpers/load_view');
var Document = require('../../shared/helpers/document');

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
    expected = "ee ee es so om me en na am me eee ees eso som ome men ena nam ame eees eeso esom some omen mena enam name eeeso eesom esome somen omena menam ename eeesom eesome esomen somena omenam mename eeesome eesomen esomena somenam omename eeesomen eesomena esomenam somename eeesomena eesomenam esomename eeesomenam eesomename eeesomename"
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

  it('ascii folds', function() {
    var indexed = res.internal.contact_name.value;
    expected = "ee ee es so om me en na am me eee ees eso som ome men ena nam ame eees eeso esom some omen mena enam name eeeso eesom esome somen omena menam ename eeesom eesome esomen somena omenam mename eeesome eesomen esomena somenam omename eeesomen eesomena esomenam somename eeesomena eesomenam esomename eeesomenam eesomename eeesomename";
    assert.equal(indexed, expected, JSON.stringify(indexed));
  });
});
