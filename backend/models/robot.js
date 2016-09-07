const Bookshelf = require('../services/database');

require('./request');

var Robot = Bookshelf.Model.extend({
  tableName: 'robots',
  hasTimestamps: true,

  requests: function() {
    return this.hasMany('Request', 'robotId');
  },
});

module.exports = Bookshelf.model('Robot', Robot);
