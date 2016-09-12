const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');

const requestEvents = require('./request_events');
const tcp = require('./services/tcp');
const routes = require('./routes/index');
const sms = require('./routes/sms');
const preview = require('./routes/preview');
const predictions = require('./predictions');

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

module.exports = app;
