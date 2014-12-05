// "version": "0.0.4"

function index(doc) {
  'use strict';
  // couchapp imports
  // !code vendor/tokenizer/ngram.js
  // !code vendor/locations/lookup.js
  // !code vendor/fields/field.js
  // !code vendor/analyzers/fold_to_ascii.js
  // this requires are using for test since this view cannot use commonjs modules

  var Field = Field || require('../../../couch/search/vendor/fields/field');
  var lookup = lookup || require('../../../couch/search/vendor/locations/lookup');
  var tokenizer = tokenizer || require('../../../couch/search/vendor/tokenizer/ngram');
  var foldToASCII = foldToASCII || require('../../../couch/search/vendor/analyzers/fold_to_ascii');

  var ret = new Document();
  if (doc.doc_type !== 'case') {
    return null;
  }
  // key previous key if existing undefined if not
  function idx(obj, objectKey) {
    var field, value;
    for (var key in obj) {
      if (obj[key]) {
        switch (typeof obj[key]) {
        case 'object':
          field = new Field(key);
          if (field.indexable()) {
            idx(obj[key], key);
          }
          break;
        case 'function': break;
        case 'string':
          field = new Field(key);
          if (field.indexable()) {
            value = foldToASCII(obj[key].trim());
            if (field.isLocation()) {
              value = lookup.adaptedName(field.locationDepth(), value, obj);
            } else if (field.nGrammable() && value !== 'undefined') {
              value = tokenizer.allNGramPhrase(value, 2).join(' ');
            } else if (field.hasDateType()) {
              value = new Date(value);
            }
            ret.add(value, {field: field.label(doc, objectKey), type: field.luceneType()});
            ret.add(value, {type: field.luceneType()});
          }  else {
            return null;
          }
          break;
        default:
          value = obj[key];
          field = new Field(key);
          if (field.hasDateType()) {
            value = new Date(value);
          } else if (field.isLocation()) {
            value = lookup.adaptedName(field.locationDepth(), value);
          }
          ret.add(value, {field: field.label(doc, objectKey), type: field.luceneType()});
          break;
        }
      }
    }
  }
  doc = lookup.addLocationAndNormalizeKeys(doc);
  idx(doc);
  return ret;
}
