const express = require('express');
const twilio = require('twilio');

const Request = require('../models/request');
const requestManager = require('../utils/request_manager');
const postcode = require('../utils/postcode');

const router  = express.Router();
const client = twilio(
  process.env.TWILIO_SID || '',
  process.env.TWILIO_TOKEN || ''
);

router.get('/', (req, res) => {
  res.render('pages/sms', {
    phoneNumber: process.env.TWILIO_PHONE_NUMBER || '',
  });
});

router.post('/', (req, res) => {
  const body = req.body.Body.replace(/[^\w\s]/gi, '');
  const from = req.body.From;
  const to = req.body.To;
  const data = {
    postcode: body,
    phoneNumber: from,
  };

  if (!from) {
    return res.sendStatus(400);
  }

  const code = postcode(body);

  Promise.all([
    // Check if the postcode is a full valid postcode, Eg: EC2A 3AR
    code.isValid(),

    // Check if the postcode can be autocompleted, Eg: EC2 could be EC2A 3AR
    // If it can it will return a list of possible postcodes
    code.autocomplete(),
  ]).then((values) => {
    const isFullPostcode = values[0];

    // Check if autocompleted returned a list of possible postcodes.
    // Also check if postcode is bigger than 3, otherwise a SMS like "S" would
    // return all postcodes starting with "S" and would be valid
    const isPartialPostcode = values[1] && body.length > 3;

    if (isFullPostcode || isPartialPostcode) {
      // Add a new request to the database
      return requestManager.createNewRequest(data).then((request) => {
        const id = request.get('id');

        // And send a text back using the valid template
        res.render('sms/valid', { id, layout: false });
      });
    }

    // Else send a text back using the invalid template
    res.render('sms/invalid', { layout: false });
  }).catch(() => {
    console.log('[SMS] an error occurred');
  });

  console.log(`[SMS] message received from ${from}`);
});

module.exports = router;
