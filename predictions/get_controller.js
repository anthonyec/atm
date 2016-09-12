const fs = require('fs');
const path = require('path');
const normalizedPath = path.join(__dirname, 'controllers');

// Return a key value map with all the controllers
const controllers = fs.readdirSync(normalizedPath).reduce((obj, file) => {
  const name = path.basename(file, '.js');
  const controller = require('./controllers/' + file).controller;
  obj[name] = controller;
  return obj;
}, {});

// Get the first controller in the object to use it dynamically as the default
// controller name
const firstController = Object.keys(controllers)[0];

module.exports = function getController(name) {
  if (!controllers.hasOwnProperty(name)) {
    console.warn('Could not get controller', name);
    name = firstController;
  }

  return controllers[name];
}
