const addCommas = require('../../utils/add_commas.js');

exports.controller = function(yearlyIncome = 26593) {
  yearlyIncome = addCommas(yearlyIncome);

  return { yearlyIncome };
}
