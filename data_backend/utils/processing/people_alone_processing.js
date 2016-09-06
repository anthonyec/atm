exports.peopleAloneProcessing = function(data) {
  //  divide people alone(1907) by number of people total(1906)
  let result = 0;

  if (data) {
    const peopleAlone = data['1907'] || 0;
    const peopleTotal = data['1906'] || Infinity;

    const percentage = (peopleAlone / peopleTotal) * 100;
    const percentageRounded = (Math.round(percentage * 1000) / 1000);

    result = `${percentageRounded}%`;
  }

  return result;
}
