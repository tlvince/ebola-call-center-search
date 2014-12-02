// !code vendor/locations/data.js

var locations = locations || require('./data');


// normalization mapping for location keys
var mapping = {
  adminDivision1: "adminDivision1",
  adminDivision2: "adminDivision2",
  adminDivision3: "adminDivision3",
  provinceCode:   "adminDivision1",
  districtCode:   "adminDivision2",
  chiefdomCode:   "adminDivision3",
  province_code:  "adminDivision1",
  district_code:  "adminDivision2",
  chiefdom_code:  "adminDivision3"
};

var extend = function(a, b) {
  for (var key in b) {
    a[key] = b[key];
  }
  return a;
};

// normalizes an object with correct keys
var normalize = function(a) {
  //normalization function for keys
  var normalizeLocationKey = function(key) {
    return mapping[key] || key;
  }
  Object.keys(a).forEach(function(key) {
    if ((normalized = normalizeLocationKey(key)) !== key) {
      a[normalized] = a[key];
      delete a[key];
    }
  });
  return a;
}

var lookup = {
  name: function (depth, id) {
    if (depth > locations.data.length - 1) {
      return id;
    }
    var region = locations.data[depth].items.filter(function(x) { return x.id === id; });
    if (region.length > 0) {
      return region[0].name;
    } else {
      return id;
    }
  },

  // ad location keys in case they are missing and normalizes them
  addLocationAndNormalizeKeys: function(aDoc) {
    var keys = ["contact", "patient", "response"]
    var extended, normalized;
    keys.forEach(function(key) {
      extended = extend(locations.keys[key], aDoc[key]);
      normalized = normalize(extended);
      aDoc[key] = extended;
    });
    return aDoc;
  },
};

if( typeof(exports) === 'object' ) {
  module.exports = lookup;
}
