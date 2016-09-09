const Bookshelf = require('../services/database');

require('./request');

var Robot = Bookshelf.Model.extend({
  tableName: 'robots',
  hasTimestamps: true,

  requests() {
    return this.hasMany('Request', 'robotId');
  },

  templates() {
    return this.hasMany('Template', 'robotId');
  },
}, {
  getRequests() {
    console.log('Get requests');
  },
});

module.exports = Bookshelf.model('Robot', Robot);
