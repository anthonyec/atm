const express = require('express');

const Request = require('../models/request');

const router  = express.Router();

router.get('/', function(req, res) {
  res.sendStatus(200);
});

const request = new Request({
  postcode: 'se20 8pj',
  phoneNumber: '+44000000000',
});

request.assignRobot();

module.exports = router;
