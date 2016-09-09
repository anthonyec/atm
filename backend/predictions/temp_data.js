const makeMoneyController = require('./controllers/make_money');
const giraffeController = require('./controllers/giraffe');
const heartDiseaseController = require('./controllers/heart_disease');
const populationController = require('./controllers/population');
const ratPoisonController = require('./controllers/rat_poison');
const fishingIndustryController = require('./controllers/fishing_industry');
const worksHomeController = require('./controllers/works_home');

exports.predictions = {
  'make-money': {
    endpoint: 'life-expectancy',
    templatePath: 'predictions/views/predictions/make_money.hbs',
    controller: makeMoneyController.controller
  },
  'giraffe': {
    endpoint: 'life-expectancy',
    templatePath: 'predictions/views/predictions/giraffe.hbs',
    controller: giraffeController.controller
  },
  'heart-disease': {
    endpoint: 'heart-disease',
    templatePath: 'predictions/views/predictions/heart-disease.hbs',
    controller: heartDiseaseController.controller
  },
  'population': {
    endpoint: 'population',
    templatePath: 'predictions/views/predictions/population.hbs',
    controller: populationController.controller
  },
  'rat-poison': {
    endpoint: 'rat-poison',
    templatePath: 'predictions/views/predictions/rat_poison.hbs',
    controller: ratPoisonController.controller
  },
  'fishing-industry': {
    endpoint: 'fishing-industry',
    templatePath: 'predictions/views/predictions/fishing_industry.hbs',
    controller: fishingIndustryController.controller
  },
  'works-home': {
    endpoint: 'works-home',
    templatePath: 'predictions/views/predictions/works_home.hbs',
    controller: worksHomeController.controller
  }
};
