const express = require('express');
const twilio = require('twilio');
const moment = require('moment-timezone');

const requestManager = require('../utils/request_manager');
const postcode = require('../utils/postcode');
const isBetweenOpeningHours =
  require('../utils/opening_hours').isBetweenOpeningHours;
const isSpam = require('../utils/spam');

const router  = express.Router();
const client = twilio(
  process.env.TWILIO_SID || '123', // add some fake number if env not set
  process.env.TWILIO_TOKEN || '123' // add some fake number if env not set
);

router.get('/', (req, res) => {
  res.render('pages/sms', {
    phoneNumber: process.env.TWILIO_PHONE_NUMBER || '',
  });
});

router.post('/', (req, res) => {
  //  check if there's any Body at all
  if (!req.body.Body) {
    //  empty message has been sent, send invalid sms template
    return res.render('sms/invalid', { layout: false });
  }

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

  //  check if sms sent withing agreed time interval (make sure we're using
  //  London timezone, cause production has set different timeozne)
  const nowTime = moment().tz('Europe/London');
  const isOpen = isBetweenOpeningHours(nowTime);
  if (!isOpen) {
    //  sms sent either late or early in the day, or on day when gallery is no
    //  longer open
    return res.render('sms/closed', { layout: false });
  }

  const code = postcode(body);

  Promise.all([
    // Check if we don't have too many requests
    isSpam(from),

    // Check if the postcode is a full valid postcode, Eg: EC2A 3AR
    code.isValid(),

    // Check if the postcode can be autocompleted, Eg: EC2 could be EC2A 3AR
    // If it can it will return a list of possible postcodes
    code.autocomplete()

  ]).then((values) => {
    //  check if the spam filter worked out that there are too many request from
    //  given number
    const spam = values[0];
    if (spam) {
      //  too many request, send spam notification
      return res.render('sms/spam', { layout: false });
    }

    const isFullPostcode = values[1];

    // Check if autocompleted returned a list of possible postcodes.
    // Also check if postcode is bigger than 3, otherwise a SMS like "S" would
    // return all postcodes starting with "S" and would be valid
    const isPartialPostcode = values[2] && body.length > 3;

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
  }).catch((e) => {
    console.log('[SMS] an error occurred', e);
    res.setStatus(500);
  });

  console.log(`[SMS] message received from ${from}`);
});

module.exports = router;
