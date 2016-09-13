'use strict';

const { Router } = require('express');

const router = new Router();

const generatePrediction = require('./generate_prediction.js');
const predictions = require('./temp_data').predictions;

router.get('/', (req, res) => {
  res.render('predictions', { predictions });
});

router.get('/:name', (req, res) => {
  const name = req.params.name;
  const postcode = req.query.postcode;

  const predictionRow = predictions[name];
  const data = {
    jobId: '82',
  };

  const predictionText = generatePrediction(postcode, predictionRow, data)
    .then((resp) => {
      const htmlString = resp.replace(/(?:\r\n|\r|\n)/g, '<br />');
      res.send(htmlString);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
});

module.exports = router;
