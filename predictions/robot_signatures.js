const ROBOT_SIGNATURES = {
  'astrologer': 'SKY_351',
  'health': 'DOC_616',
  'banker': 'GDP_548',
  'crime': 'DCI_404',
};

exports.getRobotSignatures = function(robot) {
  return ROBOT_SIGNATURES[robot] || '';
}
