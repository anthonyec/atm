exports.integerProcessing = function(data) {
  let result = 0;

  if (data) {
    result = data[Object.keys(data)[0]];
    result = Math.round(result);
  }

  return result;
}
