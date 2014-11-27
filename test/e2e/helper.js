module.exports = function loadView(view_path) {
  var c = require('fs').readFileSync(view_path, {
    encoding: 'utf-8'
  });
  return '('+c+')';
};
