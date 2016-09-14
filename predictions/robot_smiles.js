const ROBOT_SMILES = {
  'astrologer': 'confused',
  'doctor': 'shocked',
  'banker': 'sad',
  'crime': 'happy',
};

exports.getRobotSmile = function(robot) {
  return ROBOT_SMILES[robot] || '';
}
