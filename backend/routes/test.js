const express = require('express');

const Request = require('../models/request');
const Robot = require('../models/robot');

const router  = express.Router();

// Request.where({id: 1}).fetch({withRelated: ['robot']}).then(function(results) {
//   console.log(results.toJSON());
//   // console.log(results.related('robot').toJSON());
// }).catch(function(err) {
//   console.log(err);
//   // return next(new Error(err));
// });

Robot.where({id: 22}).fetch({withRelated: ['requests']}).then(function(results) {
  console.log(results.toJSON());
  // console.log(results.related('robot').toJSON());
}).catch(function(err) {
  console.log(err);
  // return next(new Error(err));
});


// Request.where({id: 1}).fetch().then(function(results) {
//   console.log(results.toJSON());
// });

router.get('/', function(req, res) {
  res.sendStatus(200);
});

module.exports = router;
