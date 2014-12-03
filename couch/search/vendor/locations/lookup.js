// !code vendor/locations/data.js

var locations = locations || require('./data');

var country;

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
};

var name = function(depth, id) {
    if (depth > locations.data.length - 1) {
      return id;
    }
    var region = locations.data[depth].items.filter(function(x) { return x.id === id; });
    if (region.length > 0) {
      return region[0].name;
    } else {
      return id;
    }
};

var country = function() {
    var res;
    if (name(0,'C') === "conakry") {
      res = 'gin';
    } else if (name(1,'1') === "bo") {
      res = 'sl';
    } else {
      res = 'lr';
    }
    return res;
}();

//normalizes cases for sierra leona
//level 2, '01' --> '1'
//level 3, 'n' -->  level2 + level3(padded with 0)
var processAdminDivision2 = function(id) {
  var res = id;
  if (id !== 'undefined') {
    res = (parseInt(id, 10)).toString();
    if (res === 'NaN') {
      res = id;
    }
  }
  return res;
}

var pad = function(id) {
  var res = id;
  if (id.length === 1) {
    res = "0" + id;
  }
  return res;
}

var processAdminDivision3 = function(level2, level3) {
  var res, regex = /^\d{1,2}$/; //at least one digit at most two
  if (level3.match(regex) && level2.match(regex)) {
    res = processAdminDivision2(level2) + "-" + pad(level3);
  } else {
    res = level3;
  }
  return res;
}

var adaptedName = function(depth, id, obj) {
  if (country === 'sl') {
    switch(depth) {
      case 1:
        id = processAdminDivision2(id)
        break;
      case 2:
        id = processAdminDivision3(processAdminDivision2(obj.adminDivision2), id)
        break;
      default:
        break;
    }
  }
  return name(depth, id);
}

var lookup = {
  adaptedName: adaptedName,
  name: adaptedName,
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
  country: country
};



if( typeof(exports) === 'object' ) {
  module.exports = lookup;
}
