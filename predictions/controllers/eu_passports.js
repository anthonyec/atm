const addCommas = require('../../utils/add_commas.js');

exports.controller = function(euPassports = 8000) {
  euPassports = addCommas(euPassports);
  return { euPassports };
}
