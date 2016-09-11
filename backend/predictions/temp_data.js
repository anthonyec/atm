const makeMoneyController = require('./controllers/make_money');
const giraffeController = require('./controllers/giraffe');
const stolenPhonesController = require('./controllers/stolen_phones');
const crimesController = require('./controllers/crimes');
const euPassportsController = require('./controllers/eu_passports');
const heartDiseaseController = require('./controllers/heart_disease');
const populationController = require('./controllers/population');
const ratPoisonController = require('./controllers/rat_poison');
const fishingIndustryController = require('./controllers/fishing_industry');
const worksHomeController = require('./controllers/works_home');
const seekingWorkController = require('./controllers/seeking_work');
const worksPartTimeController = require('./controllers/works_part_time');

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
  'stolen-phones': {
    endpoint: 'life-expectancy',
    templatePath: 'predictions/views/predictions/stolen_phones.hbs',
    controller: stolenPhonesController.controller
  },
  'eu-passports': {
    endpoint: 'eu-passports',
    templatePath: 'predictions/views/predictions/eu_passports.hbs',
    controller: euPassportsController.controller
  },
  'ebola': {
    endpoint: 'population',
    templatePath: 'predictions/views/predictions/ebola.hbs',
    controller: populationController.controller
  },
  'crimes': {
    endpoint: 'crimes',
    templatePath: 'predictions/views/predictions/crimes.hbs',
    controller: crimesController.controller
  },
  'heart-disease': {
    endpoint: 'heart-disease',
    templatePath: 'predictions/views/predictions/heart_disease.hbs',
    controller: heartDiseaseController.controller
  },
  'rat-poison': {
    endpoint: 'yearly-income',
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
  },
  'seeking-work': {
    endpoint: 'seeking-work',
    templatePath: 'predictions/views/predictions/seeking_work.hbs',
    controller: seekingWorkController.controller
  },
  'works-part-time': {
    endpoint: 'works-part-time',
    templatePath: 'predictions/views/predictions/works_part_time.hbs',
    controller: worksPartTimeController.controller
  }
};
