const getRandomEnding = require('./jupiter/endings').getRandomEnding;
const addCommas = require('../../utils/add_commas.js');

exports.controller = function(weeklyIncome = 520, heartDisease = 12, commuteOver20 = 15) {
  const randomEnding = getRandomEnding();

  weeklyIncome = addCommas(weeklyIncome);

  return {
    weeklyIncome,
    heartDisease,
    commuteOver20,
    randomEnding,
  };
}
