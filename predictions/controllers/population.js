const addCommas = require('../../utils/add_commas.js');

exports.controller = function(population = 200000) {
  population = addCommas(population);
  return { population };
}
