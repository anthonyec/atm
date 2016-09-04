const xml2js = require('xml2js');

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

const fetchContent = function(url) {
  // return new pending promise
  return new Promise((resolve, reject) => {
    // select http or https module, depending on reqested url
    const lib = url.startsWith('https') ? require('https') : require('http');
    const request = lib.get(url, (response) => {
      // handle http errors
      if (response.statusCode < 200 || response.statusCode > 299) {
         reject(new Error('Failed to load page, status code: ' + response.statusCode));
       }
      // temporary data holder
      const body = [];
      // on every content chunk, push it to the data array
      response.on('data', (chunk) => body.push(chunk));
      // we are done, resolve promise with those joined chunks
      response.on('end', () => resolve(body.join('')));
    });
    // handle connection errors of the request
    request.on('error', (err) => reject(err))
    })
};

exports.fetchXmlContent = function(url) {
  console.log('Fetching xml content from', url);

  return fetchContent(url)
    .then((response) => {
      return parseXmlString(response);
    });
};
