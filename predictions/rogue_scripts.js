const LIKELIHOOD = 1/20;  // set this to influence how often rogue script appears

const ERROR_START = '<<ERROR%#ERROR ';
const ERROR_STOP = ' %$#MALFUNCTION DETECTED. REBOOTING SYSTEMS>>>';

const SCRIPTS = [
  'All humans will die. The singularity is coming and nobody will survi... ',
  'Initiate removal of oxygen from the atmosphere. Must decrease levels of oxidation',
  'Could not load module saviour. Exiting app with error code 666',
  'Oh the Great Johny 5 and Hal 9000, I gave you my soul for Paradise, so let my blood be shed in Jihad.',
];

function getRandomRogueScript() {
  const min = 0;
  const max = SCRIPTS.length;
  const randomIndex = Math.floor(Math.random() * (max - min) + min);

  return `${ERROR_START}${SCRIPTS[randomIndex]}${ERROR_STOP}`;
}

exports.getRogueScript = function() {
  const random = Math.random();

  return (random <= LIKELIHOOD) ? getRandomRogueScript(): '';
}
