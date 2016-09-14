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

  // Instance methods
  setStatusIncomplete() {
    this.set('status', consts.INCOMPLETE);
    return this.save();
  },

  setStatusPrinting() {
    this.set('status', consts.PRINTING);
    return this.save();
  },

  setStatusComplete() {
    this.set('status', consts.COMPLETE);
    return this.save();
  },
}, {
  // Static methods
  getLatestIncomplete() {
    return this.forge()
      .where({ status: consts.INCOMPLETE })
      .query('orderBy', 'created_at', 'desc')
      .fetch({ withRelated: ['robot'] });
  },

  getAllForPhoneNumberAfterTime(phoneNumber, date) {
    return this.forge()
      .where({ phoneNumber: phoneNumber })
      .where('created_at', '>', date)
      .count();
  }


});

module.exports = Bookshelf.model('Request', Request);
module.exports.consts = consts;
