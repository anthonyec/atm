const addCommas = require('../../utils/add_commas.js');

exports.controller = function(worksHome = 200000) {
  worksHome = addCommas(worksHome);

  return { worksHome };
}
