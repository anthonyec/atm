const FUTURES = [
  "PLEASENT",
  "FULFILLING",
];

exports.getRandomFuture = function() {
  const min = 0;
  const max = FUTURES.length;
  const randomIndex = Math.floor(Math.random() * (max - min) + min);

  return FUTURES[randomIndex];
}
