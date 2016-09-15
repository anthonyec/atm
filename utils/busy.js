const moment = require('moment');
const Request = require('../models/request');

//  do we want to check how many request are we getting from in total
const BUSY_FILTER_ENABLED = true;

const MAX_PER_10_SECONDS = 4;
const MAX_PER_MINUTE = 60;

const TIME_FORMAT = 'YYYY-MM-DD h:mm:ss a';

function getCountForLast10Seconds() {
  return new Promise((resolve, reject) => {

    //  minute ago time
    const secondsAgo = moment().subtract(10, 'seconds').toDate();

    Request.getAllAfterTime(secondsAgo)
      .then((count) => {
        return resolve(count);
      })
      .catch((err) => {
        console.error('Error fetching request', err);
        //  be on a safe side, return 0, as in no request for within last
        //  10 seconds
        return resolve(0);
      })
  });
}

function getCountForLastMinute() {
  return new Promise((resolve, reject) => {

    //  hour ago time
    const minuteAgo = moment().subtract(1, 'minutes').toDate();

    Request.getAllAfterTime(minuteAgo)
      .then((count) => {
        return resolve(count);
      })
      .catch((err) => {
        console.error('Error fetching request', err);
        //  be on a safe side, return 0, as in no request for given phone
        //  number within the last minute
        return resolve(0);
      })
  });
}

function isBusy() {
  return new Promise((resolve, reject) => {

    //  if spam filter not enabled, just return true
    if (!BUSY_FILTER_ENABLED) {
      return resolve(true);
    }

    Promise.all([
      getCountForLast10Seconds(),
    //  getCountForLastHour(phoneNumber),
    ])
      .then((values) => {
        const last10SecondsCount = (values && values.length) ? values[0]: 0;

        console.log(`BUSY check, last10SecondsCount: ${last10SecondsCount}, MAX_PER_10_SECONDS: ${MAX_PER_10_SECONDS}`);

        //  do we have more request then allowed?
        const isBusy = (last10SecondsCount > MAX_PER_10_SECONDS);

        return resolve(isBusy);
      })
      .catch((err) => {
        console.log('Error fetching request', err);
        //  spam detection failed, let's assume it's not spam
        return resolve(false);
      });
  });
}

module.exports = isBusy;
