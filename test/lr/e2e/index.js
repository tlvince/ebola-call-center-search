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
    expected = "mo on nt ts se er rr ra ad do mon ont nts tse ser err rra rad ado mont onts ntse tser serr erra rrad rado monts ontse ntser tserr serra errad rrado montse ontser ntserr tserra serrad errado montser ontserr ntserra tserrad serrado montserr ontserra ntserrad tserrado montserra ontserrad ntserrado montserrad ontserrado montserrado";
    assert.equal(indexed, expected, JSON.stringify(indexed));
  });

  it('indexes contact_admindivision2 as labeled location', function() {
    var indexed = res.internal.contact_admindivision2.value;
    expected = "Di is st tr ri ic ct Dis ist str tri ric ict Dist istr stri tric rict Distr istri stric trict Distri istric strict Distric istrict District #7"
    assert.equal(indexed, expected, JSON.stringify(indexed));
  });

  it('indexes contact_admindivision3, which is undefined, as ngram undefined', function() {
    var indexed = res.internal.contact_admindivision3.value;
    expected = "undefined";
    assert.equal(indexed, expected, JSON.stringify(indexed));
  });
});
