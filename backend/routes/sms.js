const express = require('express');
const twilio = require('twilio');

const Request = require('../models/request');
const requestManager = require('../utils/request_manager')();
const postcode = require('../utils/postcode');

const router  = express.Router();
const client = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_TOKEN
);

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
      const data = {
        postcode: body,
        phoneNumber: from,
      };

      // TODO: clean up these callback hells
      return requestManager.createNewRequest(data).then((request) => {
        const twiml = new twilio.TwimlResponse();
        const id = request.get('id');

        twiml.message(`Your prediction number is ${id}`);
        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(twiml.toString());
      });
    }

    // do a search to see if it is really not valid
    code.autocomplete().then((results) => {
      if (results && body.length > 3) {
        const data = {
          postcode: body,
          phoneNumber: from,
        };

        return requestManager.createNewRequest(data).then((request) => {
          const twiml = new twilio.TwimlResponse();
          const id = request.get('id');

          twiml.message(`Your prediction number is ${id}`);
          res.writeHead(200, {'Content-Type': 'text/xml'});
          res.end(twiml.toString());
        });
      }

      const twiml = new twilio.TwimlResponse();

      twiml.message(`Hey, that postcode is not valid UK postcode. Have another try`);
      res.writeHead(200, {'Content-Type': 'text/xml'});
      res.end(twiml.toString());
    });
  });
});

module.exports = router;
