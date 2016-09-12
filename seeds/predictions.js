const { getRobotByName } = require('./robots');

const predictions = [
  //  astrologer
  {
    robotId: getRobotByName('astrologer').id,
    endpoints: 'people-alone',
    templatePath: 'predictions/views/predictions/people_alone.hbs',
    controller: 'people_alone'
  },
  {
    robotId: getRobotByName('astrologer').id,
    endpoints: 'weekly-income,heart-disease,commute-over-20',
    templatePath: 'predictions/views/predictions/jupiter.hbs',
    controller: 'jupiter'
  },
  {
    robotId: getRobotByName('astrologer').id,
    endpoints: 'area-road,work-admin,population',
    templatePath: 'predictions/views/predictions/mars.hbs',
    controller: 'mars'
  },

  //  banker
  {
    robotId: getRobotByName('banker').id,
    endpoints: 'life-expectancy',
    templatePath: 'predictions/views/predictions/make_money.hbs',
    controller: 'make_money'
  },
  {
    robotId: getRobotByName('banker').id,
    endpoints: 'works-home',
    templatePath: 'predictions/views/predictions/works_home.hbs',
    controller: 'works_home'
  },
  {
    robotId: getRobotByName('banker').id,
    endpoints: 'life-expectancy',
    templatePath: 'predictions/views/predictions/giraffe.hbs',
    controller: 'giraffe'
  },

  //  crime
  {
    robotId: getRobotByName('crime').id,
    endpoints: 'yearly-income',
    templatePath: 'predictions/views/predictions/rat_poison.hbs',
    controller: 'rat_poison'
  },
  {
    robotId: getRobotByName('crime').id,
    endpoints: 'crimes',
    templatePath: 'predictions/views/predictions/crimes.hbs',
    controller: 'crimes'
  },
  {
    robotId: getRobotByName('crime').id,
    endpoints: 'life-expectancy',
    templatePath: 'predictions/views/predictions/stolen_phones.hbs',
    controller: 'stolen_phones'
  },

  //  doctor
  {
    robotId: getRobotByName('doctor').id,
    endpoints: 'eu-passports',
    templatePath: 'predictions/views/predictions/eu_passports.hbs',
    controller: 'eu_passports'
  },
  {
    robotId: getRobotByName('doctor').id,
    endpoints: 'age-over-60',
    templatePath: 'predictions/views/predictions/age_over_60.hbs',
    controller: 'age_over_60'
  },
  {
    robotId: getRobotByName('doctor').id,
    endpoints: 'population',
    templatePath: 'predictions/views/predictions/ebola.hbs',
    controller: 'population'
  },
];

exports.seed = function(knex, Promise) {
  return knex('predictions').del()
    .then(function () {
      const promises = predictions.map((prediction) => {
        return knex('predictions').insert(prediction);
      });

      return Promise.all(promises);
    });
};
