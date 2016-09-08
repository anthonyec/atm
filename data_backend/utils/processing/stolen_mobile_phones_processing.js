exports.stolenMobilePhonesProcessing = function(data) {
  //  average of male(5781) and female expectancy(5784)
  let result = 0;

  if (data) {
    //  compute life expetancy
    const maleExpectancy = parseFloat(data['5781']) || 0;
    const femaleExpectancy = parseFloat(data['5784']) || 0;

    const average = (maleExpectancy + femaleExpectancy) / 2;
    const averageRounded = Math.round(average);

    const ids = ['7020','7024'];

    const totalIds = ['7019', '7023'];

    const sum = ids.reduce((acc, id) => {
      const singleData = data[id]
      const newSum = acc + parseFloat(singleData);
      return newSum;
    }, 0);

    const totalSum = totalIds.reduce((acc, id) => {
      const singleData = data[id]
      const newSum = acc + parseFloat(singleData);
      return newSum;
    }, 0);

    console.log('sum', sum, 'totalSum', totalSum);

    const percentage = (sum / totalSum) * 100;
    const percentageRounded = (Math.round(percentage * 1000) / 1000);

    result = `${percentageRounded}%`;
  }

  return result;
}
