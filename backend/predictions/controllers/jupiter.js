const getRandomEnding = require('./jupiter/endings').getRandomEnding;

exports.controller = function(weeklyIncome = 520, heartDisease = 12, commuteOver20 = 15) {
  console.log('weeklyIncome', weeklyIncome, 'heartDisease', heartDisease, 'commuteOver20', commuteOver20);

  const randomEnding = getRandomEnding();

  return {
    weeklyIncome,
    heartDisease,
    commuteOver20,
    randomEnding,
  };
}
