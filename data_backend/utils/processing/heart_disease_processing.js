exports.heartDiseaseProcessing = function(data) {
  //  average of male(5781) and female expectancy(5784)
  let result = 0;

  if (data) {
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
