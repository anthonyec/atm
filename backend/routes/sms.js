const express = require('express');
const twilio = require('twilio');

const postcode = require('../utils/postcode');

const router  = express.Router();
// const client = twilio(
//   'ACe948f126472b3edeac8378ed89ea285c',
//   'f38f35c73ffc1783596d7620b55461c0'
// );

const client = twilio(
  'AC07d0a956bb2cf35496e83f642d002f64',
  '12ca2465e702388bae692d8b19a3903b'
);

function addRequest() {
  console.log(`[SMS] valid`);
  // add to request
}

function sendInvalidMessageTo (phoneNumber) {
  client.sendMessage({
    from: '447403934123',
    to: phoneNumber,
    body: `Hey, that postcode is not valid UK postcode. Have another try`,
  });

  console.log(`[SMS] invalid`);
}

router.get('/', function(req, res) {
  res.render('pages/sms');
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
