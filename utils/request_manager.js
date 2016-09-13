const EventEmitter = require('events').EventEmitter;
const util = require('util');
const _ = require('lodash');

const Request = require('../models/request');
const Robot = require('../models/robot');

const events = new EventEmitter();

function RequestManager() {
  // Public methods
  return({
    createNewRequest,
    events,
  });

  function fetchLatestRequest(query = {}) {
    return Request.forge()
      .where(query)
      .query('orderBy', 'created_at', 'desc')
      .fetch();
  }

  function fetchRobots() {
    return Robot.forge().fetchAll();
  }

  function getRandomRobot(rejectQuery) {
    return new Promise((resolve, reject) => {
      Promise.all([
        // Fetch all the robots
        fetchRobots(),

        // Fetch the latest request submitted by anyone
        fetchLatestRequest(),

        // Fetch the latest request specific to a query. In this use case
        // we will fetch one with a specific phoneNumber. Eg: {phoneNumber: ''}
        fetchLatestRequest(rejectQuery),
      ]).then((values) => {
        const robots = values[0].toJSON();
        const hasLastRobot = values[1] !== null;
        const hasLastQueryRobot = values[2] !== null;

        // Get robotIds from both types of latest requests
        const lastRobotId = hasLastRobot ? values[1].get('robotId') : null;
        const lastQueryRobotId = hasLastQueryRobot ? values[2].get('robotId') : null;

        // Return an array of robots that don't use the ids from the latest
        // request or the latest request by specific query
        const suitableRobots = _.reject(robots, (robot) => {
          return robot.id === lastRobotId || robot.id === lastQueryRobotId;
        });

        // Randomly return a robot from the suitable candidates
        const randomRobot = _.sample(suitableRobots);
        resolve(randomRobot);
      }).catch(reject);
    });
  }

  function createNewRequest(options) {
    return new Promise((resolve, reject) => {
      const rejectQuery = {
        phoneNumber: options.phoneNumber,
      };

      return getRandomRobot(rejectQuery).then((robot) => {
        const robotId = robot.id;
        const request = new Request(Object.assign({}, options, { robotId }));

        request.save().then(() => {
          events.emit('created', request);
          resolve(request);
        }).catch(reject);
      });
    });
  }
}

module.exports = RequestManager();