const consts = require('../models/request').consts;

const requests = [
  {
    postcode: 'se26',
    status: consts.COMPLETE,
    phoneNumber: '+440000000000',
    robotId: 2,
  },
  {
    postcode: 'se20 8pj',
    phoneNumber: '+440000000002',
    robotId: 1,
  },
  {
    postcode: 'SW15 2QS',
    phoneNumber: '+440000000003',
    robotId: 3,
  },
  {
    postcode: 'EC2',
    phoneNumber: '+440000000004',
    robotId: 2,
  },
  {
    postcode: 'EC2',
    phoneNumber: '+440000000005',
    robotId: 4,
  },
];

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
