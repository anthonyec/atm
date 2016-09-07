'use strict';

const Bookshelf = require('../config/database');

require('./robot');

var Request = Bookshelf.Model.extend({
  tableName: 'requests',
  hasTimestamps: true,

  robot: function() {
    return this.belongsTo('Robot', 'robotId');
  },
});

module.exports = Bookshelf.model('Request', Request);
