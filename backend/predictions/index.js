'use strict';

const { Router } = require('express');

const router = new Router();

const generatePrediction = require('./generate_prediction.js');
const predictions = require('./temp_data').predictions;

router.get('/', (req, res) => {
  res.render('predictions', {});
});

router.get('/:name', (req, res) => {
  const name = req.params.name;
  const postcode = req.query.postcode;

  const predictionRow = predictions[name];
  const data = {
    jobId: 'job-id-1',
    phoneNumber: 'phone-number-1',
    robotName: 'robot-1',
  };

  const predictionText = generatePrediction(postcode, predictionRow, data)
    .then((resp) => {
      res.send(resp);
    });
});

module.exports = router;
