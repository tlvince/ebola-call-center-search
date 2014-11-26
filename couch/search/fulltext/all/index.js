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
            }
            ret.add(value, {field: key});
          }  else {
            return null;
          }
          break;
        default: ret.add(obj[key], {field: key});
          break;
        }
      }
    }
  }
  idx(doc);
  return ret;
}
