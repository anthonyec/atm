const TITLES = [
  "your future is still long",
  "your future is now"
];

exports.getRandomTitle = function() {
  const min = 0;
  const max = TITLES.length;
  const randomIndex = Math.floor(Math.random() * (max - min) + min);

  return TITLES[randomIndex];
}
