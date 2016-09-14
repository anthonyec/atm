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

      timeout = setTimeout(() => {
        monitor();
      }, 10000);
    }, (err) => {
      console.log(err);
    });
  }
}

module.exports = robots();
