const getVarIdForDatapoint = function(datapoint) {
  switch(datapoint) {
    case 'household':
      return 8634;
    case 'life-expectancy':
      return 5781;
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
    case 'household':
    case 'life-expectancy':
      return 13;
    default:
      return 11;
  }
}

const getOperationsDatapoint = function(datapoint) {
  switch(datapoint) {
    default:
      return [];
  }
}

exports.getDatapointConfig = function(datapoint) {
  //  return variableIds, areaLevel available, operations necessary
  const variableId = getVarIdForDatapoint(datapoint);
  const areaLevel = getAreaLevelForDatapoint(datapoint);
  const operations = getOperationsDatapoint(datapoint);

  return { variableId, areaLevel, operations };
}
