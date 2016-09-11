const request = require('request');
const fs = require('fs');
const hbs = require('hbs');

const API_URL = 'http://atm-data-api.herokuapp.com/api/1/datapoints';
const PARTIALS_TEMPLATE_DIRECTORY = `${__dirname}/views/partials`;

const getRandomGreeting = require('./greetings').getRandomGreeting;

function fetchApiData(postcode, endpointName) {
  return new Promise((resolve, reject) => {
    //  construct url
    const url = `${API_URL}/${endpointName}/?postcode=${postcode}`;

    request({ url }, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        resolve(body);
      } else {
        reject(new Error(`Failed to fetch API data, status code: ${error}`));  //  eslint-disable-line max-len
      }
    });
  });
}

function fetchApisData(postcode, endpointsString) {
  return new Promise((resolve, reject) => {
    const endpoints = endpointsString.split(',');
    //  fetch data from all endpoints;
    const promises = endpoints.map((endpoint) => {
      return fetchApiData(postcode, endpoint);
    });

    Promise.all(promises)
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        console.log('Err!', err);
        reject(err)
      });
  });
}

function fetchFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', function(err, contents) {
      if (!err) {
        resolve(contents);
      } else {
        reject(err);
      }
    });
  });
}


function generatePrediction(postcode, options, headerFooterData) {
  return new Promise((resolve, reject) => {

    const { endpoints, templatePath, controller } = options;

    //  1) fetchdata from api
    const apiDataPromise = fetchApisData(postcode, endpoints);

    // 2) fetch template for prediction body
    const predictionTmpUrl = options.templatePath;
    const predictionTmpFilePromise = fetchFile(predictionTmpUrl);

    //  3) register partials for header and footer
    hbs.registerPartials(`${__dirname}/views/partials`);

    //  4) wait for everything to load
    Promise.all([apiDataPromise, predictionTmpFilePromise])
        .then((values) => {

          try {
            const apiData = values[0];
            const predictionTmp = values[1];

            //  compile template
            const template = hbs.compile(predictionTmp);

            // do additional logic on data from API
            const controllerData = controller.apply(this,apiData);

            const greeting = getRandomGreeting();

            //  combine data from API with data that are used for header and
            //  footer partials
            const tmpData = Object.assign({}, controllerData, headerFooterData,
              { greeting });

            // pass all data to template to get final string
            const predictionString = template(tmpData);

            //  all done
            resolve(predictionString);
          } catch(err) {
            reject(err);
          }
        })
        .catch((err) => {
          reject(err);
        });

  });
}

module.exports = generatePrediction;

