const makeMoneyController = require('./controllers/make_money');
const giraffeController = require('./controllers/giraffe');
const jupiterController = require('./controllers/jupiter');
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
    endpoints: 'life-expectancy',
    templatePath: 'predictions/views/predictions/make_money.hbs',
    controller: makeMoneyController.controller
  },
  'jupiter': {
    endpoints: 'weekly-income,heart-disease,commute-over-20',
    templatePath: 'predictions/views/predictions/jupiter.hbs',
    controller: jupiterController.controller
  },
  'giraffe': {
    endpoints: 'life-expectancy',
    templatePath: 'predictions/views/predictions/giraffe.hbs',
    controller: giraffeController.controller
  },
  'stolen-phones': {
    endpoints: 'life-expectancy',
    templatePath: 'predictions/views/predictions/stolen_phones.hbs',
    controller: stolenPhonesController.controller
  },
  'eu-passports': {
    endpoints: 'eu-passports',
    templatePath: 'predictions/views/predictions/eu_passports.hbs',
    controller: euPassportsController.controller
  },
  'ebola': {
    endpoints: 'population',
    templatePath: 'predictions/views/predictions/ebola.hbs',
    controller: populationController.controller
  },
  'crimes': {
    endpoints: 'crimes',
    templatePath: 'predictions/views/predictions/crimes.hbs',
    controller: crimesController.controller
  },
  'heart-disease': {
    endpoints: 'heart-disease',
    templatePath: 'predictions/views/predictions/heart_disease.hbs',
    controller: heartDiseaseController.controller
  },
  'rat-poison': {
    endpoints: 'yearly-income',
    templatePath: 'predictions/views/predictions/rat_poison.hbs',
    controller: ratPoisonController.controller
  },
  'fishing-industry': {
    endpoints: 'fishing-industry',
    templatePath: 'predictions/views/predictions/fishing_industry.hbs',
    controller: fishingIndustryController.controller
  },
  'works-home': {
    endpoints: 'works-home',
    templatePath: 'predictions/views/predictions/works_home.hbs',
    controller: worksHomeController.controller
  },
  'seeking-work': {
    endpoints: 'seeking-work',
    templatePath: 'predictions/views/predictions/seeking_work.hbs',
    controller: seekingWorkController.controller
  },
  'works-part-time': {
    endpoints: 'works-part-time',
    templatePath: 'predictions/views/predictions/works_part_time.hbs',
    controller: worksPartTimeController.controller
  }
};
