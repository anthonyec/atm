const moment = require('moment');
const Request = require('../models/request');

//  do we want to check how many request are we getting from one number
const SPAM_FILTER_ENABLED = true;

const MAX_PER_MINUTE = 3;
const MAX_PER_HOUR = 20;

const TIME_FORMAT = 'YYYY-MM-DD h:mm:ss a';

function getCountForLastMinute(phoneNumber) {
  return new Promise((resolve, reject) => {

    //  minute ago time
    const minuteAgo = moment().subtract(1, 'minutes').toDate();

    Request.getAllForPhoneNumberAfterTime(phoneNumber, minuteAgo)
      .then((count) => {
        return resolve(count);
      })
      .catch((err) => {
        console.error('Error fetching request for phone number', err);
        //  be on a safe side, return 0, as in no request for given phone
        //  number within the last minute
        return resolve(0);
      })
  });
}

function getCountForLastHour(phoneNumber) {
  return new Promise((resolve, reject) => {

    //  hour ago time
    const hourAgo = moment().subtract(1, 'hours').toDate();

    Request.getAllForPhoneNumberAfterTime(phoneNumber, hourAgo)
      .then((count) => {
        return resolve(count);
      })
      .catch((err) => {
        console.error('Error fetching request for phone number', err);
        //  be on a safe side, return 0, as in no request for given phone
        //  number within the last minute
        return resolve(0);
      })
  });
}

function isSpam(phoneNumber) {
  return new Promise((resolve, reject) => {

    //  if spam filter not enabled, just return true
    if (!SPAM_FILTER_ENABLED) {
      return resolve(true);
    }

    Promise.all([
      getCountForLastMinute(phoneNumber),
      getCountForLastHour(phoneNumber),
    ])
      .then((values) => {
        const lastMinuteCount = (values && values.length) ? values[0]: 0;
        const lastHourCount = (values && values.length) ? values[1]: 0;

        console.log(`SPAM check, phoneNumber: ${phoneNumber}, lastMinute ${lastMinuteCount}, lastHour: ${lastHourCount}, MAX_PER_MINUTE: ${MAX_PER_MINUTE}, MAX_PER_HOUR: ${MAX_PER_HOUR}`);

        //  do we have more request then allowed?
        const isSpam = (lastMinuteCount > MAX_PER_MINUTE) ||
          (lastHourCount > MAX_PER_HOUR);

        return resolve(isSpam);
      })
      .catch((err) => {
        console.log('Error fetching request for phone number', err);
        //  spam detection failed, let's assume it's not spam
        return resolve(false);
      });
  });
}

module.exports = isSpam;
