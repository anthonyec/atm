const Bookshelf = require('../services/database');

require('./request');

var Robot = Bookshelf.Model.extend({
  tableName: 'robots',
  hasTimestamps: true,

  requests() {
    return this.hasMany('Request', 'robotId');
  },

  predictions() {
    return this.hasMany('Prediction', 'predictionId');
  },
});

module.exports = Bookshelf.model('Robot', Robot);
