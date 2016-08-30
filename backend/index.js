const Particle = require('particle-api-js');
const Sequelize = require('sequelize');
const wrap = require('wordwrapjs');
const async = require('async');

const particle = new Particle();

const token = '06cc7b661a61f322744821d1fc2660d783d6400a';
const deviceId = '3e0035000347343339373536';

// const devices = particle.listDevices({ auth: token });

// devices.then((devices) => {
//     console.log('Devices: ', devices);
//   }, () => {
//     console.log('List devices call failed: ', err);
//   }
// );

const text = '25% of your child is obese.\n\nBut you\'re not a child anymore.\n\nLong gone are the days of strolling through the meadows, nothing to worry about but the ice cream truck leaving a little too soon today.\n\n\n\n';
const wrapped = wrap(text, {
  width: 32,
  break: true,
});


// console.log(wrapped.split('\
const functions = wrapped.split('\n').map((line) => {
  return (callback) => {
    const printText = particle.callFunction({
      auth: token,
      deviceId: deviceId,
      name: 'printText',
      argument: line,
    });

    printText.then(() => {
      callback(null);
    }, (err) => {
      console.log('Error', line);
      callback(true);
    })
  }
});

async.series(functions);


// const login = particle.login({
//   username: 'anthonyecossins@gmail.com',
//   password: '6594742@par',
// });

// login.then((data) => {
//   console.log('Logged in!', data);
// }, (err) => {
//   console.log('Error logging in', err);
// });


// var sequelize = new Sequelize('pyb_robots', 'root', '', {
//   host: 'localhost',
//   dialect: 'mysql',
//   pool: {
//     max: 5,
//     min: 0,
//     idle: 10000
//   },
// });

// sequelize
//   .authenticate()
//   .then(function(err) {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(function (err) {
//     console.log('Unable to connect to the database:', err);
//   });
