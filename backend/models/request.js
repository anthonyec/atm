const Bookshelf = require('../services/database');
const Robot = require('./robot');

const consts = {
  INCOMPLETE: 'INCOMPLETE',
  PRINTING: 'PRINTING',
  COMPLETE: 'COMPLETE',
};

var Request = Bookshelf.Model.extend({
  tableName: 'requests',
  hasTimestamps: true,

  robot() {
    return this.belongsTo('Robot', 'robotId');
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

module.exports = Bookshelf.model('Request', Request);
module.exports.consts = consts;
