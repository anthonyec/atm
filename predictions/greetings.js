const GREETINGS = [
  "Hello human.",
  "Hello mortal.",
  "Hello lifeform.",
  "Hello meatbag.",
  "Hello primate.",
  "Hello truth-seeker.",
  "Hello person.",
  "Hello primitive species.",
  "Hello master.",
];

exports.getRandomGreeting = function() {
  const min = 0;
  const max = GREETINGS.length;
  const randomIndex = Math.floor(Math.random() * (max - min) + min);

  return GREETINGS[randomIndex];
}
