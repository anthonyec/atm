const Bookshelf = require('../services/database');
const Request = require('./request');
const Particle = require('particle-api-js');

const particle = new Particle();
const token = process.env.PARTICLE_TOKEN;

var Robot = Bookshelf.Model.extend({
  tableName: 'robots',
  hasTimestamps: false,

  requests() {
    return this.hasMany('Request', 'robotId');
  },

  predictions() {
    return this.hasMany('Prediction', 'predictionId');
  },

  // Instance methods
  requestReceiptPrint(receiptId) {
    const deviceId = this.get('deviceId');

    return particle.callFunction({
      deviceId,
      name: 'printData',
      argument: `pbots.net;2000;${receiptId}`,
      auth: token,
    });
  },
});

module.exports = Bookshelf.model('Robot', Robot);
