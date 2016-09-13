const express = require('express');

const router  = express.Router();

router.get('/', function(req, res) {
  res.send(`I'll be back (probably)`);
});

router.post('/print', function(req, res) {
  res.sendStatus(404);
});

router.get('/status', function(req, res) {
  res.sendStatus(404);
});

module.exports = router;
