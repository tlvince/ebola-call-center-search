// !code vendor/locations/data.js

var locations = locations || require('./data');

var lookup = {
  name: function (depth, id) {
    var region = locations.data[depth].items.filter(function(x) { return x.id === id; });
    if (region.length > 0) {
      return region[0].name;
    } else {
      return id;
    }
  }
};

if( typeof(exports) === 'object' ) {
  module.exports = lookup;
}
