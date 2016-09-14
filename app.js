// require('newrelic'); commented 4 now
const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');

const requestEvents = require('./request_events');
const tcp = require('./services/tcp');
const robots = require('./services/robots');
const routes = require('./routes/index');
const hbs = require('hbs');

const sms = require('./routes/sms');
const preview = require('./routes/preview');
const predictions = require('./predictions');
const registerHelpers = require('./predictions/hbs_helpers.js');
const registerSmsHelpers = require('./predictions/sms_hbs_helpers.js');
const isSmsOnlyMode = require('./utils/sms_only_mode.js');

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
  robots.monitor();
});

streamer.listen(2000, () => {
  console.log('[TCP] server started: port 2000');
});

//  register partials for header and footer of the predictions
hbs.registerPartials(`${__dirname}/predictions/views/partials`);

//  if we were using sms-only mode, we need to register empty helpers
if (!isSmsOnlyMode()) {
  //  normal helpers for printer
  registerHelpers(hbs);
} else {
  //  empty helpers for phone
  registerSmsHelpers(hbs);
}

module.exports = app;
