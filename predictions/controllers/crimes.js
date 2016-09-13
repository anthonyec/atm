const addCommas = require('../../utils/add_commas.js');

exports.controller = function(dataStringArr = "[1233, 808, 1432, 1560, 1968]") {

  const cleanedString = dataStringArr.replace(/"/g, '');
  const list = cleanedString.split(',');

  let robberies = (list && list.length) ? list[0] : 0;
  let carThefts = (list && list.length > 1) ? list[1] : 0;
  let homesBurgled = (list && list.length > 2) ? list[2] : 0;
  let commonAssaults = (list && list.length > 3) ? list[3] : 0;
  let drugOffences = (list && list.length > 4) ? list[4] : 0;

  robberies = addCommas(robberies);
  carThefts = addCommas(carThefts);
  homesBurgled = addCommas(homesBurgled);
  commonAssaults = addCommas(commonAssaults);
  drugOffences = addCommas(drugOffences);

  return {
    robberies,
    carThefts,
    homesBurgled,
    commonAssaults,
    drugOffences,
  };
}
