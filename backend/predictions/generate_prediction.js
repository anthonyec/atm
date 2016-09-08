
// options = {
//   endpoint,
//   name,
//   templatePath,
//   controler,
// }
// data = {
//   jobId,
//   phoneNumber,
//   robotName
// }

const request = require('request');
const fs = require('fs');
const hbs = require('hbs');

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


function generatePrediction(postcode, options, data) {
  return new Promise((resolve, reject) => {

    const { endpoint, templatePath, controller } = options;

    //  1) fetchdata from api
    const apiDataPromise = fetchApiData(postcode, endpoint);

    // 2) fetch template for prediction body
    const predictionTmpUrl = options.templatePath;
    const predictionTmpFilePromise = fetchFile(predictionTmpUrl);

    //  3) register partials for header and footer
    hbs.registerPartials(`${__dirname}/views/partials`);

    //  wait for everything to load
    Promise.all([apiDataPromise, predictionTmpFilePromise])
      .then((values) => {

          const apiData = values[0];
          const predictionTmp = values[1];

          //  compile template
          const template = hbs.compile(predictionTmp);

          // data here is the value returned from the data endpoint above
          const tmpData = controller(apiData);
          const predictionString = template(tmpData);

          resolve(predictionString);

          //  run controller to modify api data and generate anything dynamic for template
          // const dynamicTemplateData = options.controller(apiData)

          // //  merge dynamic body data and data for header and footer
          // const templateData = dynamicTempateData.merge(data);


          // //  render template and done
          // const render = template(template, templateData);
          // return render;

        })
        .catch((err) => {
          reject(err);
        });

  });
}

module.exports = generatePrediction;

