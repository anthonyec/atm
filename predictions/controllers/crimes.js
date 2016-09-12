exports.controller = function(dataStringArr = "[1233, 808, 1432, 1560, 1968]") {

  const cleanedString = dataStringArr.replace(/"/g, '');
  const list = cleanedString.split(',');

  const robberies = (list && list.length) ? list[0] : 0;
  const carThefts = (list && list.length > 1) ? list[1] : 0;
  const homesBurgled = (list && list.length > 2) ? list[2] : 0;
  const commonAssaults = (list && list.length > 3) ? list[3] : 0;
  const drugOffences = (list && list.length > 4) ? list[4] : 0;

  return {
    robberies,
    carThefts,
    homesBurgled,
    commonAssaults,
    drugOffences,
  };
}
