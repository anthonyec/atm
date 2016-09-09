const robots = [
  {
    id: 1,
    name: 'cop',
    photonId: '3e0035000347343339373536',
    photonName: 'blue',
  },
  {
    id: 2,
    name: 'doctor',
    photonId: '',
    photonName: 'red',
  },
  {
    id: 3,
    name: 'money',
    photonId: '',
    photonName: 'green',
  },
  {
    id: 4,
    name: 'professor',
    photonId: '',
    photonName: 'yellow',
  },
];

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('robots').del()
    .then(function () {
      const promises = robots.map((robot) => {
        return knex('robots').insert(robot);
      });

      return Promise.all(promises);
    });
};
