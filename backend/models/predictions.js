const Bookshelf = require('../services/database');

require('./robot');

var Prediction = Bookshelf.Model.extend({
  tableName: 'predictions',

  robot() {
    return this.belongsTo('Robot', 'robotId');
  },
});

module.exports = Bookshelf.model('Prediction', Prediction);
