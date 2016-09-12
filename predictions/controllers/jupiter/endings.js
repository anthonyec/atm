const ENDINGS = [
  "you will dance with a chimp.",
  "you will lose a paperclip.",
  "you will walk near a hotel.",
  "you will think about werewolves.",
  "you will bite a chimney.",
  "you will invent perpetual motion.",
  "you will pervert the course of justice.",
  "you will design a rollercoaster.",
  "you will trip over a hose.",
  "you will delete the internet.",
  "you will become immortal.",
  "you will be covered in parasites.",
  "you will win a wig.",
  "you will conquer the free world.",
  "you will witness a gangland shooting.",
  "you will feel sympathy for a goldfish.",
  "you will overthrow the monarchy.",
  "you will be five minutes late.",
  "you will misspell 'the' as 'teh'.",
  "you will spill a bag of seeds.",
  "you will query a recent bank statement.",
  "you will find some shoes in a bin.",
  "you will consider taking up chess.",
  "you will disintegrate completely.",
  "you will win the nuclear arms race.",
  "you will consider changing mobile phone provider, look into it, but ultimately decide it's not worth the hassle, your current contract isn't too bad actually, plenty of free minutes and unlimited texts.",
  "you will feel a headache coming on.",
  "you will annoy someone by clearing your throat.",
  "you will disagree with a film review.",
  "you will be the fifth Beatle.",
];

exports.getRandomEnding = function() {
  const min = 0;
  const max = ENDINGS.length;
  const randomIndex = Math.floor(Math.random() * (max - min) + min);

  return ENDINGS[randomIndex];
}
