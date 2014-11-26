function(doc) {
  // !code vendor/tokenizer/ngram.js
  // !code vendor/locations/lookup.js

  function Field(key) {
    var nGrammable = ['name', 'phone', 'address', 'adminDivision'];
    var notIndexable = ['timestamp'];
    function present(container) {
      return container.some(function(x) {
        return key.match(new RegExp(x, 'ig')) !== null;
      });
    }
    this.nGrammable = function() {
      return present(nGrammable); };
    this.indexable = function() {
      return ! present(notIndexable); };

    //location fields start with adminDivision
    this.isLocation = function() {
      return present(['adminDivision']); };

    //returns an Integer in the range [0,2]
    this.locationDepth = function() {
      // field key encodes the depth, in the form of name1, name2
      // example: adminDivision1, adminDivision2
      var lastChar = key[key.length - 1];
      return parseInt(lastChar, 10) - 1;
    };
    this.hasDateType = function(){
      return present(['createdOn']); };
    this.luceneType = function() {
      var type = "string";
      if (this.hasDateType()) {
        type = "date";
      }
      return type;
    };
  }

  var ret = new Document();
  if (doc.doc_type !== 'case') {
    return null; }
  function idx(obj) {
    var field, value;
    for (var key in obj) {
      if (obj[key]) {
        switch (typeof obj[key]) {
        case 'object': idx(obj[key]);
          break;
        case 'function': break;
        case 'string':
          field = new Field(key);
          if (field.indexable()) {
            value = obj[key].trim();
            if (field.nGrammable()) {
              if (field.isLocation()) {
                value = lookup.name(field.locationDepth(), value);
              }
              value = tokenizer.allNGramPhrase(value, 2).join(' ');
            } else if (field.hasDateType()) {
              value = new Date(value);
            }
            ret.add(value, {"field": key, "type": field.luceneType()});
            ret.add(value, {"type": field.luceneType()});
          }  else {
            return null;
          }
          break;
        default:
          value = obj[key];
          field = new Field(key);
          if (field.hasDateType()) {
            value = new Date(value);
          }
          ret.add(value, {field: key, "type": field.luceneType()});
          break;
        }
      }
    }
  }
  idx(doc);
  return ret;
}
