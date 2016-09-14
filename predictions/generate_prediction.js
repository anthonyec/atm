const request = require('request');
const fs = require('fs');
const hbs = require('hbs');

const getRandomTitle = require('./titles').getRandomTitle;
const getRandomGreeting = require('./greetings').getRandomGreeting;
const getRobotSignatures = require('./robot_signatures').getRobotSignatures;
const getRogueScript = require('./rogue_scripts').getRogueScript;
const getRandomFuture = require('./futures').getRandomFuture;

const registerHelpers = require('./hbs_helpers.js');

const API_URL = 'http://atm-data-api.herokuapp.com/api/1/datapoints';
const PARTIALS_TEMPLATE_DIRECTORY = `${__dirname}/views/partials`;

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
        //  console.log('Err!', err);
        console.log('calling reject');
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

function renderDefaultTemplate(options, headerFooterData) {
  return fetchFile(`${__dirname}/views/predictions/fishing_industry.hbs`)
              .then((tmp) => {
                return renderPrediction({}, tmp, options, headerFooterData);
              })
              .catch((err) => {
                //  not even default template load, give up
                console.error('Could not load any of the templates');
              });
}

function renderPrediction(apiData, predictionTmp, options, headerFooterData) {
  try {
    const { controller } = options;
    const { robotId } = headerFooterData;

    const template = hbs.compile(predictionTmp);

    // do additional logic on data from API
    const controllerData = controller.apply(this, apiData);

    //  fetch additinonal data
    const greeting = getRandomGreeting();
    const robotSignature = getRobotSignatures(robotId);
    const rogueScript = getRogueScript();

    //  combine data from API with data that are used for header and
    //  footer partials
    const tmpData = Object.assign({}, controllerData, headerFooterData,
      { greeting, robotSignature, rogueScript });

    // pass all data to template to get final string
    const predictionString = template(tmpData);

    return predictionString;
  } catch(err) {
    console.log('Error compiling template', err);
  }

}

function generatePrediction(postcode, options, headerFooterData) {
  return new Promise((resolve, reject) => {

    let { templatePath, endpoints } = options;

    //  1) fetch prediction template
    const predictionTmpUrl = templatePath;
    const predictionTmpFilePromise = fetchFile(predictionTmpUrl);

    let predictionString = '';

    predictionTmpFilePromise
      .then((predictionTmp) => {
        //  2a) load data from data api
        fetchApisData(postcode, endpoints)
          .then((apiData) => {
            //  3a) got api data, ready to render template
            predictionString = renderPrediction(apiData, predictionTmp, options, headerFooterData);
            resolve(predictionString);
          })
          .catch((err) => {
            //  3b) api call failed, but template controller should have some default
            //  data
            predictionString = renderPrediction([], predictionTmp, options, headerFooterData);
            resolve(predictionString);
          });
      })
      .catch((err) => {
        //  2b) error loading template, render emergency default template
        renderDefaultTemplate(options, headerFooterData)
          .then((predictionString) => {
            resolve(predictionString);
          })
          .catch((err) => {
            reject(err);
          });
      });
  });
}

module.exports = generatePrediction;

