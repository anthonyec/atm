const predictions = [
  {
    robotId: 1,
    endpoint: 'life-expectancy',
    templatePath: 'predictions/views/predictions/make_money.hbs',
    controller: 'makeMoneyController',
  },
  {
    robotId: 2,
    endpoint: 'life-expectancy',
    templatePath: 'predictions/views/predictions/giraffe.hbs',
    controller: 'giraffeController',
  },
  {
    robotId: 3,
    endpoint: 'heart-disease',
    templatePath: 'predictions/views/predictions/heart-disease.hbs',
    controller: 'heartDiseaseController',
  },
  {
    robotId: 4,
    endpoint: 'population',
    templatePath: 'predictions/views/predictions/population.hbs',
    controller: 'populationController',
  },
  {
    robotId: 1,
    endpoint: 'rat-poison',
    templatePath: 'predictions/views/predictions/rat_poison.hbs',
    controller: 'ratPoisonController',
  },
  {
    robotId: 2,
    endpoint: 'fishing-industry',
    templatePath: 'predictions/views/predictions/fishing_industry.hbs',
    controller: 'fishingIndustryController',
  },
  {
    robotId: 3,
    endpoint: 'works-home',
    templatePath: 'predictions/views/predictions/works_home.hbs',
    controller: 'worksHomeController',
  }
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
