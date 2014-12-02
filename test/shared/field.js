var assert = require('assert');
var call = require('./examples/call/1.json')
var Field = require('../../couch/search/vendor/fields/field');

describe('label', function() {
  it('replace dots with underscore', function() {
    var field = new Field('phoneNo');
    var res = field.label(call);
    assert.equal(res,"contact_phoneno", JSON.stringify(res));
  });
  it('lowercase', function() {
    var field = new Field('phoneNo');
    var res = field.label(call, 'patient');
    assert.equal(res,"patient_phoneno", JSON.stringify(res));
  });
  it('replace underscore', function() {
    var field = new Field('doc_type');
    var res = field.label(call);
    assert.equal(res,"contact_doctype", JSON.stringify(res));
  });
  it('returns key if not in document', function() {
    var key = 'nothere'
    var field = new Field(key);
    var res = field.label(call);
    assert.equal(res, key, JSON.stringify(res));
  });
});
