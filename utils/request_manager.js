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
    getRandomRobot,
    getNextRobot,
    events,
  });

  function fetchLatestRequest(query = {}) {
    return Request.forge()
      .where(query)
      .query('orderBy', 'created_at', 'desc')
      .fetch();
  }

  function fetchRobots() {
    //  make sure to fetch only available robots
    return Robot.forge()
      .where('isAvailable', 1)
      .where('isConnected', 1)
      .fetchAll();
  }

  function getNextRobot() {
    return new Promise((resolve, reject) => {
      Promise.all([
        fetchRobots(),
        fetchLatestRequest(),
      ]).then((values) => {
        const robots = values[0].toJSON();
        const hasLastRobot = values[1] !== null;
        const lastRobotId = hasLastRobot ? values[1].get('robotId') : null;

        const lastRobotIndex = robots.findIndex((robot) => {
          return robot.id === lastRobotId;
        });

        let nextRobotIndex = lastRobotIndex === robots.length - 1 ?
          0 :
          lastRobotIndex + 1;

        resolve(robots[nextRobotIndex]);
      }).catch(reject);
    });
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
        let suitableRobots = _.reject(robots, (robot) => {
          return robot.id === lastRobotId || robot.id === lastQueryRobotId;
        });

        // double check that we have any suitable robots
        if (suitableRobots.length === 0) {
          //  no suitable robots found, just pick one at random
          suitableRobots = robots;
        }

        // Randomly return a robot from the suitable candidates
        const randomRobot = _.sample(suitableRobots);

        resolve(randomRobot);
      }).catch(reject);
    });
  }

  function createNewRequest(options) {
    return new Promise((resolve, reject) => {
      return getNextRobot().then((robot) => {
        const robotId = robot.id;
        const attempts = 0;
        const request = new Request(Object.assign({}, options, {
          robotId,
          attempts,
        }));

        request.save().then(() => {
          events.emit('created', request);
          resolve(request);
        }).catch(reject);
      });
    });
  }
}

module.exports = RequestManager();
