const Bookshelf = require('../services/database');

require('./request');

var Receipt = Bookshelf.Model.extend({
  tableName: 'receipts',
  hasTimestamps: true,

  request() {
    return this.belongsTo('Request', 'requestId');
  },
});

module.exports = Bookshelf.model('Receipt', Receipt);
