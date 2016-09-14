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
    return new Promise((resolve, reject) => {
      const deviceId = this.get('deviceId');
      const url = process.env.TCP_URL || '';
      const port = process.env.TCP_PORT || '';
      const argument = `${url};${port};${receiptId}`;

      console.log('[APP]', argument);
      console.log('calling particle.callFunction deviceId', deviceId);

      return particle.callFunction({
        deviceId: deviceId,
        name: 'printData',
        argument: argument,
        auth: token,
      }).then(resolve, reject).catch((err) => {
        reject(err);
      });
    });
  },
});

module.exports = Bookshelf.model('Robot', Robot);
