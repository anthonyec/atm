//  http://neighbourhood.statistics.gov.uk/NDE2/Disco/FindAreas?Postcode=e84pp
var areaId = 6326132;

//  subjects
//  http://neighbourhood.statistics.gov.uk/NDE2/Disco/GetSubjects?

//  Family
//  http://neighbourhood.statistics.gov.uk/NDE2/Disco/GetDatasetFamilies?SubjectId=7&AreaId=276980

//  variables name
//  http://neighbourhood.statistics.gov.uk/NDE2/Disco/GetVariables?DateRange=2001-01-01:2010-12-31&DSFamilyId=1893

//  life expectancy -> 6274999 - London, level type 11,

//  var names
//  9381 - Up To 0.5 Persons Per Bedroom / 9380 - All Households

var lifeExpectancySubjectId = 6;
var lifeExpectancyFamilyId = 937;
var maleExpectancyVarId = 5781;
var femaleExpectancyVarId = 5784;

//  the data - for Hackney
//  http://neighbourhood.statistics.gov.uk/NDE2/Deli/getTables?Areas=6275114&Variables=5781,5784
var url = 'neighbourhood.statistics.gov.uk';
var url = 'http://neighbourhood.statistics.gov.uk/NDE2/Deli/getTables?Areas=6275114&Variables=5781,5784,9381,9380';
var qs = { 'Areas':6275114, 'Variables': '5781,5784' };

//  branch -> family -> name

//  http://neighbourhood.statistics.gov.uk/NDE2/Disco/GetDatasets?SubjectId=10&AreaId=276980

//  getAreaDetail
//  getDatasetDetail

var querystring = require('querystring');
var http = require('http');
var https = require('https');
var xml2js = require('xml2js');

var postData = querystring.stringify({
  'msg' : 'Hello World!'
});

var options = {
  host: url,
  path: 'NDE2/Deli/getTables',
  qs: qs
};

var req = http.request(url, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
    var parser = new xml2js.Parser();
    parser.parseString(chunk, function (err, result) {
        console.dir(result);
        console.log('Done');
    });
  });
  res.on('end', () => {
    console.log('No more data in response.');
  });
});

req.on('error', (e) => {
  console.log(`problem with request: ${e.message}`);
});

// write data to request body
req.write(postData);
req.end();
