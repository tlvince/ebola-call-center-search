// !code vendor/locations/data.js

var locations = locations || require('./data');

var extend = function(a, b) {
  for (var key in b) {
    a[key] = b[key];
  }
  return a;
};

var lookup = {
  name: function (depth, id) {
    var region = locations.data[depth].items.filter(function(x) { return x.id === id; });
    if (region.length > 0) {
      return region[0].name;
    } else {
      return id;
    }
  },
  // ad location keys in case they are missing
  addLocationKeys: function(doc) {
    var keys = ["contact", "patient", "response"]
    keys.forEach(function(key) {
      doc[key] = extend(locations.keys[key], doc[key]);
    });
    return doc;
  }
};

if( typeof(exports) === 'object' ) {
  module.exports = lookup;
}
