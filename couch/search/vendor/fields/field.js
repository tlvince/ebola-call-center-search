// Manages mapping from couchDB objects to Lucene
// In ES this would be equivalent to a 'mapping'
// relies on the information extracted from the key
//
// !code vendor/fields/js-traverse.js

var traverse = traverse || require('./js-traverse');

// @param key {String} the couchdDB key.
var Field = function(key) {
  var locationKeys = ['adminDivision', 'district', 'province', 'chiefdom'];
  // regex template for that fields could be turned into nGrams
  var nGrammable = ['name', 'phone', 'address'].concat(locationKeys);
  // regex template for some fields are not indexable
  var notIndexable = ['timestamp', 'changeLog'];

  // does the field match an element in a filter list
  // @param container {Array} a filter list
  // @return {Boolean}
  function present(container) {
    return container.some(function(x) {
      return key.match(new RegExp(x, 'ig')) !== null;
    });
  }

  // get the path of the key in the object
  // @param obj {Object} the full object.
  // @param parentKey {String} the parent's key.
  // @return {Array} array with the path of the key in the object
  function getPath(obj, parentKey) {
    var res = traverse(obj).paths().filter(function(x) {
      return x.join('').match(new RegExp((parentKey || '') + key + '$'));
      });
    if (res.length > 0) {
      res = res[0];
    }
    return res;
  };

  // @return {Boolean}
  this.nGrammable = function() {
    return present(nGrammable); };

  // @return {Boolean}
  this.indexable = function() {
    return ! present(notIndexable); };

  // @return {Boolean}
  //location fields start with adminDivision
  this.isLocation = function() {
    return present(locationKeys);
  };

  // @return {Integer} in the range [0,2]
  this.locationDepth = function() {
    // field key encodes the depth, in the form of name1, name2
    // example: adminDivision1, adminDivision2
    var lastChar = key[key.length - 1];
    return parseInt(lastChar, 10) - 1;
  };

  // @return {Boolean} true if is of Date type
  this.hasDateType = function(){
    return present(['createdOn', 'date']); };

  // Lucene types supported by plugin are:
  // "date, double, float, int, long, string"
  // @return {String} the lucene type, one of
  // "date, string"
  this.luceneType = function() {
    var type = "string";
    if (this.hasDateType()) {
      type = "date";
    }
    return type;
  };

  //implements convention for key path label
  //https://gist.github.com/danse/62e5f82dc35f673da349
  // replace the dot . with an underscore _.
  // Convert cases to lowercase.
  // Convert underscore separated to no separation.
  // @param obj {Object} the full object.
  // @param parentKey {String} the parent's key.
  // @return {String} the labeled key path following the configuration, or
  // the key ifself if no path is found having this key

  this.label = function(obj, parentKey){
    var convention = function(x) {
      return x.toLowerCase().replace('_', '');
    }
    var path = getPath(obj, parentKey);
    if (path.length > 0) {
      return path.map(convention).join('_');
    } else {
      return key;
    }
  }
  }

if( typeof(exports) === 'object' ) {
  module.exports = Field;
}
