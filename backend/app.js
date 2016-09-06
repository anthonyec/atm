const express = require('express');
const exphbs  = require('express-handlebars');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');

const tcp = require('./tcp');
const config = require('./config/config.json');
const routes = require('./routes/index');
const sms  = require('./routes/sms');
const preview  = require('./routes/preview');

const app = express();
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// Express Setup
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
}));
app.set('view engine', '.hbs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', routes);
app.use('/sms', sms);
app.use('/preview', preview);

app.listen(4000, function () {
  console.log('[APP] server started: port 4000');
});

module.exports = app;
