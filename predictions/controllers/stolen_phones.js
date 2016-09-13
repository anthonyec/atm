const addCommas = require('../../utils/add_commas.js');

exports.controller = function(lifeExpectancy = 80) {
  const stolenPhonesPerMonth = 10000;
  let numStolenPhones = stolenPhonesPerMonth * 12 * lifeExpectancy;

  numStolenPhones = addCommas(numStolenPhones);

  return { lifeExpectancy, numStolenPhones };
}
