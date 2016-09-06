exports.ratPoisonProcessing = function(data) {
  let result = 0;

  if (data) {
    //  not sure how to transform weekly income per household
    //  into average person income
    const weeklyIncome = data['6188'];
    const weeksLeft = 50;
    const personPerHousehold = 3;
    const personIncomePerWeek = weeklyIncome / personPerHousehold;

    result = personIncomePerWeek * weeksLeft;
    result = Math.round(result);
  }

  return result;
}
