const robots = [
  {
    id: 1,
    name: 'astrologer',
    deviceId: '3e0035000347343339373536',
    photonName: 'blue',
  },
  {
    id: 2,
    name: 'crime',
    deviceId: '',
    photonName: 'red',
  },
  {
    id: 3,
    name: 'banker',
    deviceId: '',
    photonName: 'green',
  },
  {
    id: 4,
    name: 'doctor',
    deviceId: '',
    photonName: 'yellow',
  },
];

exports.getRobotByName = function(name) {
  return robots.find((robot) => {
    return robot.name === name;
  });
}

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
