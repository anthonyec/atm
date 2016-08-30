const Sequelize = require('sequelize');
const wrap = require('wordwrapjs');

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



const text = 'Edit the Expression & Text to see matches. \r\n \r\nRoll over matches or the expression for details. Undo mistakes with cmd-z. Save Favorites & Share expressions with friends or the Community. Explore your results with Tools. A full Reference & Help is available in the Library, or watch the video Tutorial.';
const wrapped = wrap(text, {
  width: 30,
  break: true,
});

console.log(wrapped.split('\n'));
