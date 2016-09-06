exports.defaultProcessing = function(data) {
  let result = 0;

  if (data) {
    result = data[Object.keys(data)[0]];
  }

  return result;
}
