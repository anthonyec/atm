const consts = require('../models/request').consts;

const requests = [];

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('requests').del()
    .then(function () {
      const promises = requests.map((request) => {
        return knex('requests').insert(request);
      });

      return Promise.all(promises);
    });
};
