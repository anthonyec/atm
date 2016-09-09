exports.controller = function(lifeExpectancy = 80) {
  const stolenPhonesPerMonth = 10000;
  const numStolenPhones = stolenPhonesPerMonth * 12 * lifeExpectancy;

  console.log('controller', lifeExpectancy, numStolenPhones);

  return { lifeExpectancy, numStolenPhones };
}
