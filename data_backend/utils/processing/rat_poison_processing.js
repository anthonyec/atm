exports.ratPoisonProcessing = function(data) {
  let result = 0;

  if (data) {
    //  not sure how to transform weekly income per household
    //  into average person income
    const weeklyIncome = data['6194'];
    const weeksInYear = 52.1429;

    result = weeklyIncome * weeksInYear;
    result = Math.round(result);
  }

  return `£${result}`;
}
