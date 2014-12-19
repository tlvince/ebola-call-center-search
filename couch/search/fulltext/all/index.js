// "version": "0.1.1"

function index(doc) {
  'use strict';
  // to make CommonJS modules compatible with
  // couchapp import directives
  var module = module || {};
  // couchapp imports
  // !code vendor/locations/lookup.js
  // !code vendor/fields/field.js
  // !code vendor/analyzers/fold_to_ascii.js
  // this requires are using for test since this view cannot use commonjs modules

  var Field = Field || require('../../../couch/search/vendor/fields/field');
  var lookup = lookup || require('../../../couch/search/vendor/locations/lookup');
  if (typeof foldToASCII === 'undefined') {
    require('../../../couch/search/vendor/analyzers/fold_to_ascii');
  }

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
            } else if (field.hasDateType()) {
              value = new Date(value);
            }
            if (field.nGrammable() && value !== 'undefined') {
              ret.add(value, {field: field.label(doc, objectKey), type: field.luceneType(), analyzer:"ngram:{\"min\":2,\"max\":3}"});
              ret.add(value, {type: field.luceneType(), analyzer:"ngram:{\"min\":2,\"max\":3}"});
            }  else {
              ret.add(value, {field: field.label(doc, objectKey), type: field.luceneType()});
              ret.add(value, {type: field.luceneType()});
            }
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
