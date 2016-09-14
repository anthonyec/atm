const robots = [
  {
    id: 1,
    name: 'astrologer',
    deviceId: '410031000a51353335323536',
    photonName: 'yellow',
  },
  {
    id: 2,
    name: 'crime',
    deviceId: '32003d000747343339373536',
    photonName: 'blue',
  },
  {
    id: 3,
    name: 'banker',
    deviceId: '3e0035000347343339373536',
    photonName: 'red',
  },
  {
    id: 4,
    name: 'doctor',
    deviceId: '44002a001147343339383037',
    photonName: 'green',
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
