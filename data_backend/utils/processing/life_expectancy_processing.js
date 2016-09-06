exports.lifeExpectancyProcessing = function(data) {
  //  average of male(5781) and female expectancy(5784)
  let result = 0;

  if (data) {
    const maleExpectancy = parseFloat(data['5781']) || 0;
    const femaleExpectancy = parseFloat(data['5784']) || 0;

    const average = (maleExpectancy + femaleExpectancy) / 2;
    const averageRounded = Math.round(average);

    result = `${averageRounded}`;
  }

  return result;
}
