const express = require('express');
const models  = require('../models');

const router  = express.Router();

router.get('/', function(req, res) {
  models.Request.create({
    postcode: 'SE20 8PJ',
    phoneNumber: '+440000000000',
  }).then(function() {
    console.log('wow');
  });

  res.sendStatus(200);
});

module.exports = router;
