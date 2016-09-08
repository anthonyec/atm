exports.controller = function(lifeExpectancy = 80) {
  const yearsWasted = 86
  let earningYears = lifeExpectancy - yearsWasted;
  earningYears = Math.round(earningYears * 1000) / 1000;

  return { lifeExpectancy, earningYears };
}
