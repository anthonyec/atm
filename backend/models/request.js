const Bookshelf = require('../services/database');

require('./robot');

var Request = Bookshelf.Model.extend({
  tableName: 'requests',
  hasTimestamps: true,

  robot: function() {
    return this.belongsTo('Robot', 'robotId');
  },
});

module.exports = Bookshelf.model('Request', Request);
