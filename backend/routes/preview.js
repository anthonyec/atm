const fs = require('fs');
const express = require('express');
const Particle = require('particle-api-js');

const router  = express.Router();
const particle = new Particle();

const token = 'd36cc4af8d6f1c6ae094d07d447428748e3e53e0';

router.get('/', function(req, res) {
  res.render('pages/preview');
});

router.post('/print', function(req, res) {
  const timestamp = Math.floor(Date.now());
  const filename = `receipt_${timestamp}`;

  fs.writeFile(`./temp/${filename}.hbs`, req.body.text, (err) => {
    if (err) {
      return console.log(err);
    }

    const func = particle.callFunction({
      deviceId: '3e0035000347343339373536',
      name: 'printData',
      argument: `pbots.net;2000;${filename}`,
      auth: token,
    });

    func.then((data) => {
      res.sendStatus(200);
    }, (err) => {
      res.sendStatus(500);
    });
  });
});

router.get('/status', function(req, res) {
  const getDevices = particle.listDevices({ auth: token });

  getDevices.then((response) => {
    const devices = response.body;

    if (devices) {
      res.send({
        connected: devices[0].connected,
        device: devices[0],
      });
    }
    }, (err) => {
      console.log('List devices call failed: ', err);
    }
  );
});

module.exports = router;
