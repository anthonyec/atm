const _ = require('lodash'); // Couldn't use lodash/method here for some reason
const waterfall = require('async/waterfall');

const Request = require('../models/request');
const Robot = require('../models/robot');

function RequestManager(postcode) {
  return({
    createNewRequest,
  });

  function getRandomRobot(rejectQuery) {
    return new Promise((resolve, reject) => {
      waterfall([
        // Find robotId of most recent request
        (callback) => {
          Request.forge().query('orderBy', 'id', 'desc').fetch().then((request) => {
            callback(null, request.get('robotId'));
          });
        },

        // Find robotId of most recent request by the phone number
        (requestRobotId, callback) => {
          Request.where(rejectQuery).query('orderBy', 'id', 'desc').fetch().then((request) => {
            const robotId = request ? request.get('robotId') : null;
            callback(null, requestRobotId, robotId);
          });
        },

        (requestRobotId, phoneRobotId, callback) => {
          // Select the robot that is not in the previous request or requested by the
          // phone number before. If the phoneRobotId returns null then this will work
          // because it will just reject ids that are null
          Robot.forge().fetchAll().then((collection) => {
            const json = collection.toJSON();

            const suitableRobots = _.reject(json, (robot) => {
              return robot.id === requestRobotId || robot.id === phoneRobotId;
            });

            // Pick the random robot from the suitable candidates
            callback(null, _.sample(suitableRobots));
          });
        },
      ], (err, results) => {
        if (err) {
          return reject(err);
        }

        resolve(results)
      });
    });
  }

  function createNewRequest(options) {
    return new Promise((resolve, reject) => {
      const rejectQuery = {
        phoneNumber: options.phoneNumber,
      };

      getRandomRobot(rejectQuery).then((robot) => {
        const data = Object.assign({}, options, {
          robotId: robot.id,
        })
        const request = new Request(data);
        request.save().then(resolve).catch(reject);
      });
    });
  }
}

module.exports = RequestManager;
