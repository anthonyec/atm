const express = require('express');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');

const app = express();
const config = require('./config/config.json');
const routes = require('./routes/index');
const sms  = require('./routes/sms');

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Routes middleware
app.use('/', routes);
app.use('/sms', sms);

app.listen(4000, function () {
  console.log('Example app listening on port 4000!');
});

module.exports = app;
