const Particle = require('particle-api-js');

const Robot = require('../models/robot');

// Make singleton one day maybe
const particle = new Particle();
const token = process.env.PARTICLE_TOKEN;

function robots() {
  return({
    monitor,
  });

  var timeout = null;

  function setMonitorTimeout() {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      monitor();
    }, 30000);
  }

  function monitor() {
    particle.listDevices({ auth: token }).then((response) => {
      const photons = response.body;

      photons.forEach((photon) => {
        const query = { deviceId: photon.id };

        Robot.forge().where(query).fetch().then((robot) => {
          robot.set('isConnected', photon.connected);
          robot.save();
        });
      });

      console.log('[APP] device list', response.statusCode);

      setMonitorTimeout();
    }, (err) => {
      console.log(err.toString());
      setMonitorTimeout();
    });
  }
}

module.exports = robots();
