const express = require('express');
const router  = express.Router();
const twilio = require('twilio');

const client = twilio(
  'ACe948f126472b3edeac8378ed89ea285c',
  'f38f35c73ffc1783596d7620b55461c0'
);

router.post('/', function(req, res) {
  const id = Math.floor(Math.random()*100);

  console.log(req.body.From, req.body.Body);

  res.send('Create SMS message');

  client.sendMessage({
    to: req.body.From,
    from: req.body.To,
    body: `Police bot (blue) will handle your prediction.\n\nLook out for receipt number ${id}`,
  });

  setTimeout(() => {
    client.sendMessage({
      to: req.body.From,
      from: req.body.To,
      body: `Police bot (blue) has printed your prediction! It is number ${id}`,
    });
  }, 5000);

});

module.exports = router;
