const Bookshelf = require('../services/database');
const Robot = require('./robot');

var Prediction = Bookshelf.Model.extend({
  tableName: 'predictions',
  hasTimestamps: false,

  robot() {
    return this.belongsTo('Robot', 'robotId');
  },

  getRandom() {
    console.log(this);
  }
});

module.exports = Bookshelf.model('Prediction', Prediction);
