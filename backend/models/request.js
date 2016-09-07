const Bookshelf = require('../services/database');

require('./robot');

const consts = {
  INCOMPLETE: 'INCOMPLETE',
  PRINTING: 'PRINTING',
  COMPLETE: 'COMPLETE',
};

var Request = Bookshelf.Model.extend({
  tableName: 'requests',
  hasTimestamps: true,
  consts: {
  },

  robot() {
    return this.belongsTo('Robot', 'robotId');
  },

  // By default assignRobot finds a random robot that didn't get used in the
  // previous request. Other wise you can specify one
  assignRobot(robotId) {
    console.log('assignRobot');
  },

  incomplete() {
    console.log(consts.INCOMPLETE);
  },

  printing() {
    console.log(consts.PRINTING);
  },

  complete() {
    console.log(consts.COMPLETE);
  },
});

module.exports.consts = consts;
module.exports = Bookshelf.model('Request', Request);
