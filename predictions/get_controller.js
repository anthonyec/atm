const fs = require('fs');
const path = require('path');
const normalizedPath = path.join(__dirname, 'controllers');

// Return a key value map with all the controllers
const controllers = fs.readdirSync(normalizedPath).reduce((obj, file) => {
  const name = path.basename(file, '.js');
  obj[name] = require('./controllers/' + file);
  return obj;
}, {});

// Get the first controller in the object to use it dynamically as the default
// controller name
const firstController = Object.keys(controllers)[0];

module.exports = function getController(name = firstController) {
  return controllers[name];
}
