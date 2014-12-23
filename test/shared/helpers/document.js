//stub for Document object provided by C-L plugin.
var Document = module.exports = function() {
  this.internal = {};
  this.add =  function(x,y){
    if (y.field) {
      this.internal[y.field] = {
        value: x,
        field: y.field || "default",
        type: y.type,
        analyzer: y.analyzer
      };
    }
  };
};
