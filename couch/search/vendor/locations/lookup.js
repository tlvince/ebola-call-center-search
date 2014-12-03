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

// @param a {Object}.
// @param b {Object}.
// @return {Objext} extended a with values and keys in b;
var extend = function(a, b) {
  for (var key in b) {
    a[key] = b[key];
  }
  return a;
};

// normalizes object with location keys
// @return {Objext} that has normalized keys
// i.e. one of adminDivision[1,2,3]
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

// @param  {Integer} depth of the location.
// @param  {String, Integer} the id of the location.
// @return {String, Integer} the location name or the passed
// id parameter if no location name was found or if the depth was
// beyond current locations depth
// Locations ids are currently of the form:
// 1, '1', '01', 'DA', N'
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

// one of gin(Guinea), sl(Sierra Leona), lr(Liberia)
// which country is the location file from.
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

// adapts location id value sierra leona at level 2
// @param id {String} the id of the location.
// @return {String} with following mappings:
//    '01' --> '1'
//    'undefined' --> 'undefined'
//    'not a number' -> 'not a number'
var adaptSLAdminDivision2 = function(id) {
  var res = id;
  if (id !== 'undefined') {
    res = (parseInt(id, 10)).toString();
    if (res === 'NaN') {
      res = id;
    }
  }
  return res;
}

// @param id {String} the id of the location is \d\d or \d.
// @return {String} padded digit with 0 in case of \d.
var pad = function(id) {
  var res = id;
  if (id.length === 1) {
    res = "0" + id;
  }
  return res;
}

// adapts location id value for SL at level 3
// @param level2Id {String} the id of the location al level 2.
// @param level3Id {String} the id of the location al level 3.
// @return {String} in the form '\d - \d\d' iff level2Id and level3Id are matching a certain digit regex. Returns level3Id otherwise.
var adaptSLAdminDivision3 = function(level2Id, level3Id) {
  var regex = /^\d{1,2}$/, res; //at least one digit at most two
  if (level3Id.match(regex) && level2Id.match(regex)) {
    res = adaptSLAdminDivision2(level2Id) + "-" + pad(level3Id);
  } else {
    res = level3Id;
  }
  return res;
}

// wrapper around name function to adapt for SL exception location ids case
// @param depth {Integer} depth of the location.
// @param id {String, Integer} the id of the location.
// @param obj {Object} the object parent of the location.
var adaptedName = function(depth, id, obj) {
  if (country === 'sl') {
    switch(depth) {
      case 1:
        id = adaptSLAdminDivision2(id)
        break;
      case 2:
        id = adaptSLAdminDivision3(adaptSLAdminDivision2(obj.adminDivision2), id)
        break;
      default:
        break;
    }
  }
  return name(depth, id);
}

var lookup = {
  adaptedName: adaptedName,
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
