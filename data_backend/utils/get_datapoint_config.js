const { defaultProcessing } = require('./processing/default_processing');
const { integerProcessing } = require('./processing/integer_processing');
const { fishingIndustryProcessing } = require('./processing/fishing_industry_processing');
const { ratPoisonProcessing } = require('./processing/rat_poison_processing');
const { heartDiseaseProcessing } = require('./processing/heart_disease_processing');
const { euPassportProcessing } = require('./processing/eu_passport_processing');
const { lifeExpectancyProcessing } = require('./processing/life_expectancy_processing');
const { peopleAloneProcessing } = require('./processing/people_alone_processing');
const { worksHomeProcessing } = require('./processing/works_home_processing');

const getVarIdForDatapoint = function(datapoint) {
  switch(datapoint) {
    case 'people-part-time':
      return 8778;
    case 'fishing-industry':
      return '1012,1014';
    case 'rat-poison':
      return 6194;
    case 'population':
      return 627;
    case 'heart-disease':
      return '7020,7024';
    case 'age-over-60':
      return 1991;
    case 'eu-passport':
      return '9610,9611,9614,9616,9617';
    case 'household':
      return 8634;
    case 'life-expectancy':
      return '5781,5784';
    case 'people-alone':
      return '1906,1907';
    case 'works-home':
      return '2307,2308';
    default:
      return '';
  }
}


/**
* <LevelTypeId>7</LevelTypeId><Name>United Kingdom</Name>
* <LevelTypeId>8</LevelTypeId><Name>Great Britain</Name>
* <LevelTypeId>9</LevelTypeId><Name>England and Wales</Name>
* <LevelTypeId>10</LevelTypeId><Name>England</Name>
* <LevelTypeId>11</LevelTypeId><Name>London</Name>
* <LevelTypeId>13</LevelTypeId><Name>Hackney</Name>
* <LevelTypeId>140</LevelTypeId><Name>Hackney 023</Name>
* <LevelTypeId>141</LevelTypeId><Name>Hackney 023G</Name>
**/

const getAreaLevelForDatapoint = function(datapoint) {
  switch(datapoint) {
    case 'rat-poison':
      return 11;
    default:
      return 13;
  }
}

const getProcessingForDatapoint = function(datapoint) {
  switch(datapoint) {
    case 'fishing-industry':
      return fishingIndustryProcessing;
    case 'rat-poison':
      return ratPoisonProcessing;
    case 'heart-disease':
      return heartDiseaseProcessing;
    case 'eu-passport':
      return euPassportProcessing;
    case 'life-expectancy':
      return lifeExpectancyProcessing;
    case 'works-home':
      return worksHomeProcessing;
    case 'people-alone':
      return peopleAloneProcessing;
    case 'population':
    case 'people-part-time':
      return integerProcessing;
    default:
      return defaultProcessing;
  }
}

exports.getDatapointConfig = function(datapoint) {
  //  return variableIds, areaLevel available, operations necessary
  const variableId = getVarIdForDatapoint(datapoint);
  const areaLevel = getAreaLevelForDatapoint(datapoint);
  const processing = getProcessingForDatapoint(datapoint);

  return { variableId, areaLevel, processing };
}
