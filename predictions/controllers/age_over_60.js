const addCommas = require('../../utils/add_commas.js');

exports.controller = function(ageOver60 = 3100) {
  ageOver60 = addCommas(ageOver60);
  return { ageOver60 };
}
