const express = require('express');
const models  = require('../models');

const router  = express.Router();

// models.Robot.create({
//   name: 'cop',
//   photonId: '3e0035000347343339373536',
//   photonName: 'red',
// });

// models.Robot.create({
//   name: 'doctor',
//   photonId: '',
//   photonName: '',
// });

// models.Robot.create({
//   name: 'money',
//   photonId: '',
//   photonName: '',
// });

// models.Robot.create({
//   name: 'prof',
//   photonId: '',
//   photonName: '',
// });

// models.Robot.findOne({
//   where: {
//     name: 'red',
//   },
// }).then((results) => {
//   console.log(results);
// });

router.get('/', function(req, res) {
  // models.Request.create({
  //   postcode: 'SE20 8PJ',
  //   phoneNumber: '+440000000000',
  // }).then(function() {
  //   console.log('wow');
  // });


  res.sendStatus(200);
});

module.exports = router;
