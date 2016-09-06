exports.worksHomeProcessing = function(data) {
  //  divide people alone(1907) by number of people total(1906)
  let result = 0;

  if (data) {
    const peopleWorksFromHome = data['2308'] || 0;
    const peopleTotal = data['2307'] || Infinity;

    const percentage = (peopleWorksFromHome / peopleTotal) * 100;
    const percentageRounded = (Math.round(percentage * 1000) / 1000);

    result = `${percentageRounded}%`;
  }

  return result;
}
