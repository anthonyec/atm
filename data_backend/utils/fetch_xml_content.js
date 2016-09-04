const xml2js = require('xml2js');

const { fetchContent } = require('./fetch_content');

const parseXmlString = function(string) {
  return new Promise(function(resolve, reject) {
    const parser = new xml2js.Parser();
    parser.parseString(string, function (err, xml) {
      if (err) {
          //  problem with parsing fetched xml
          reject(new Error('Error parsing fetched xml: ' + err));
        } else {
          //  all good
          resolve(xml);
        }
    });
  });
}

exports.fetchXmlContent = function(url) {
  console.log('Fetching xml content from', url);

  return fetchContent(url)
    .then((response) => {
      return parseXmlString(response);
    });
};
