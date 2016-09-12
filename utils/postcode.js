const request = require('request');
const includes = require('lodash/includes');

function Postcode(postcode) {
  return({
    isValid,
    autocomplete,
  });

  function isValid() {
    return new Promise((resolve, reject) => {
      request(`http://api.postcodes.io/postcodes/${postcode}`, (err, response, body) => {
        if (err) {
          return reject();
        }

        if (response.statusCode == 200) {
          resolve(true);
        }

        if (response.statusCode == 404) {
          resolve(false);
        }
      });
    });
  }

  function autocomplete() {
    return new Promise((resolve, reject) => {
      request(`http://api.postcodes.io/postcodes/${postcode}/autocomplete`, (err, response, body) => {
        if (err) {
          return reject();
        }

        if (response.statusCode == 200) {
          resolve(JSON.parse(body).result);
        }

        if (response.statusCode == 404) {
          resolve(false);
        }
      });
    });
  }
}

module.exports = Postcode;
