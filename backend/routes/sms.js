const express = require('express');
const twilio = require('twilio');

const postcode = require('../utils/postcode');

const router  = express.Router();
const client = twilio(
  process.env.TWILIO_SID || '123', // add some fake number if env not set
  process.env.TWILIO_TOKEN || '123' // add some fake number if env not set
);

function addRequest() {
  console.log(`[SMS] valid`);
  // add to request
}

function sendInvalidMessageTo (phoneNumber) {
  client.sendMessage({
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phoneNumber,
    body: `Hey, that postcode is not valid UK postcode. Have another try`,
  });

  console.log(`[SMS] invalid`);
}

router.get('/', function(req, res) {
  res.render('pages/sms', {
    phoneNumber: process.env.TWILIO_PHONE_NUMBER,
  });
});

router.post('/', function(req, res) {
  const body = req.body.Body;
  const from = req.body.From;
  const to = req.body.To;

  if (!from) {
    return res.sendStatus(400);
  }

  console.log(`[SMS] received from ${from}`);

  const code = postcode(body);

  code.isValid().then((valid) => {
    if (valid) {
      return addRequest();
    }

    // do a search to see if it is really not valid
    code.autocomplete().then((results) => {
      if (results && body.length > 3) {
        return addRequest();
      }

      sendInvalidMessageTo(from);
    });
  });

  res.sendStatus(200);
});

module.exports = router;
