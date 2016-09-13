const GREETINGS = [
  "Bonjour.",
  "Hello there.",
  "Greetings.",
];

exports.getRandomGreeting = function() {
  const min = 0;
  const max = GREETINGS.length;
  const randomIndex = Math.floor(Math.random() * (max - min) + min);

  return GREETINGS[randomIndex];
}
