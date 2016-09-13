const addCommas = require('../../utils/add_commas.js');

exports.controller = function(areaRoad = 520, workAdmin = 12, population = 15) {

  areaRoad = addCommas(areaRoad);
  population = addCommas(population);

  return {
    areaRoad,
    workAdmin,
    population,
  };
}
