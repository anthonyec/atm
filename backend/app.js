const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');

const tcp = require('./services/tcp');
const config = require('./config/config.json');
const routes = require('./routes/index');
const sms  = require('./routes/sms');
const preview  = require('./routes/preview');
const predictions  = require('./predictions');

const app = express();

// Express Setup
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
}));
app.set('view engine', '.hbs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', routes);
app.use('/sms', sms);
app.use('/preview', preview);
app.use('/predictions', predictions);

app.listen(process.env.PORT || 4000, function () {
  console.log('[APP] server started: port 4000');
});

/** TEMP - example of using generatePrediction **/
const generatePrediction = require('./predictions/generate_prediction.js');
const tempData = require('./predictions/temp_data').predictions;

const postcode = 'E84PP';
const data = {
  jobId: 'job-id-1',
  phoneNumber: 'phone-number-1',
};

generatePrediction(postcode, tempData['giraffe'], data)
  .then((prediction) => {
    console.log('Prediction generated!');
    console.log(prediction);
  })
  .catch((err) => {
    console.error(err.toString());
  });

module.exports = app;
