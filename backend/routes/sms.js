var express = require('express');
var router  = express.Router();

router.post('/', function(req, res) {
  console.log(req.body.From, req.body.Body);
  res.send('Create SMS message');
});

module.exports = router;
