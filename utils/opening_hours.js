// Check if now date fulfill following conditions
// 1) is between 15th and 20th of September 2016
// 2) is 15th or is between 9:50am and 6:10pm

const moment = require('moment');

const START_DATE = moment('2016-09-13');
const PUBLIC_START_DATE = moment('2016-09-16');
const END_DATE = moment('2016-09-20');
const START_HOUR = 10;
const END_HOUR = 18;

function isCorrectDate(momentDate) {
  if (!momentDate) {
    return false;
  }

  const isBefore = momentDate.isBefore(START_DATE, 'day');
  const isAfter = momentDate.isAfter(END_DATE, 'day');

  return !isBefore && !isAfter;
}

function isCorrectHour(momentDate) {
  if (!momentDate) {
    return false;
  }

  //  if it's before 16th, it's either private viewing or testing so no
  //  opening hours in gallery and is always valid
  const isBefore = momentDate.isBefore(PUBLIC_START_DATE, 'day');
  if (isBefore) {
    //  before the initial opening, any hour is a good hour
    return true;
  }

  const nowHour = momentDate.hour();

  let isOutsideOfficeHours = false;
  if (nowHour < START_HOUR) {
    //  before 10am
    isOutsideOfficeHours = true;
  } else if (nowHour >= END_HOUR) {
    //  after 6pm
    isOutsideOfficeHours = true;
  }

  //  TODO - should be slighlty more forgiving
  return !isOutsideOfficeHours;
}

module.exports.isBetweenOpeningHours = function(momentDate) {

  const correctDate = isCorrectDate(momentDate);
  const correctHour = isCorrectHour(momentDate);

  return correctDate && correctHour;
}

