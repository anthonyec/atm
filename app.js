// require('newrelic'); commented 4 now
const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');

const requestEvents = require('./request_events');
const tcp = require('./services/tcp');
const routes = require('./routes/index');
const sms = require('./routes/sms');
const preview = require('./routes/preview');
const predictions = require('./predictions');
const hbs = require('hbs');

const app = express();
const streamer = tcp();

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

streamer.listen(2000, () => {
  console.log('[TCP] server started: port 2000');
});

//  register partials for header and footer of the predictions
hbs.registerPartials(`${__dirname}/predictions/views/partials`);


/* temp */
setTimeout(() => {
  const generatePrediction = require('./predictions/generate_prediction.js');
  const postcode = 'e84pp';
  const options = require('./predictions/temp_data').predictions['people-alone'];
  const headerFooterData = {};

  generatePrediction(postcode, options, headerFooterData)
    .then((resp) => {
      console.log('resp', resp);
    })
    .catch((err) => console.log(err))
  }, 250);


module.exports = app;
