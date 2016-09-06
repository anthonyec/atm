exports.euPassportProcessing = function(data) {
  //  average of male(5781) and female expectancy(5784)
  let result = 0;

  if (data) {
    const ids = ['9610','9611','9614','9616','9617'];

    const sum = ids.reduce((acc, id) => {
      const singleData = data[id]
      const newSum = acc + parseFloat(singleData);
      return newSum;
    }, 0);

    result = Math.round(sum)  ;
  }

  return result;
}
