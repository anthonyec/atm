const express = require('express');
const fs = require('fs');
const exphbs  = require('express-handlebars');
const _  = require('lodash');

const { fetchXmlContent } = require('./utils/fetch_xml_content');
const { parseDataResponse } = require('./utils/data_parser');
const { getDatapointConfig } = require('./utils/get_datapoint_config');
const { getAreaIdByPostcode } = require('./utils/get_area_id_by_postcode.js');
const { fetchContent } = require('./utils/fetch_content.js');

const readJsonFileSync = function(filepath){
  const dir = 'metadata/data/';
  const file = fs.readFileSync(`${dir}${filepath}`, 'utf-8');
  return JSON.parse(file);
}

const app = express();
app.use(express.static('public'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
  res.send('Definitely not a Star Wars reference!');
});

/**
*  API
**/
app.get('/api/v1', function (req, res) {
  res.send('e.g. http://localhost:3000/api/v1/datapoints/household/?postcode=e84pp');
});

//  datapoint route
app.get('/api/v1/datapoints/:datapoint', function(req, res) {
  //  validation
  if (!req.params.datapoint) {
    res.status(500).send({ error: 'Missing ":datapoint" part of query' });
  }
  if (!req.query.postcode) {
    res.status(500).send({ error: 'Missing "postcode" query param' });
  }

  const datapoint = req.params.datapoint;
  const postcode = req.query.postcode;

  //  1) resolve datapoint name (e.g. life-expectancy) to actual variable name as used at neighbourhood.statistics.gov.uk
  const datapointConfig = getDatapointConfig(datapoint)

  //  2) get areaId based on postcode and area level that's available for variable
  if (!datapointConfig.areaLevel) {
    res.status(500).send({ error: `Could not find area level for datapoint: ${datapoint}` });
  }

  const areaLevel = datapointConfig.areaLevel;
  getAreaIdByPostcode(postcode, datapointConfig.areaLevel)
    .then((areaId) => {
      if (areaId === -1) {
        res.status(500).send({ error: `Could not find area for postcode: ${postcode}` });
      }

      //  3) fetch the actual data from variables endpoint
      const variableId = datapointConfig.variableId;
      const baseUrl = req.protocol + '://' + req.get('host');
      const url = `${baseUrl}/api/v1/variables/${variableId}?areaId=${areaId}`;
      fetchContent(url)
        .then((resp) => {
          //  4) potentially do some operations on the fetched data
          const respObj = JSON.parse(resp);
          res.json(respObj);
        })
        .catch((err) => {

        });
    })
    .catch((err) => {
      const errMsg = (err) ? err.toString(): '';
      res.status(500).send({ error: `Could not find area for postcode: ${postcode}. ${errMsg}` });
    });

});


//  variables route
//  e.g. http://localhost:3000/api/v1/variables/5784?areaId=6275114&fields=value,title,description
app.get('/api/v1/variables/:varId', function(req, res) {
  //  validation
  if (!req.params.varId) {
    res.status(500).send({ error: 'Missing "varId" part of query' });
  }
  if (!req.query.areaId) {
    res.status(500).send({ error: 'Missing "areaId" query param' });
  }

  //  varIds: 5781,5784
  //  areaId: 6275114
  const variableId = req.params.varId;
  const areaId = req.query.areaId;
  const fields = (req.query.fields)? req.query.fields.split(',') : [];

  const DATA_URL = `http://neighbourhood.statistics.gov.uk/NDE2/Deli/getTables?Areas=${areaId}&Variables=${variableId}`;
  fetchXmlContent(DATA_URL)
    .then((resp) => {
      try {
        res.json(parseDataResponse(resp, fields));
      } catch(err) {
        res.status(500).send({ error: (err) ? err.toString() : 'Unknown error' });
      }
    })
    .catch((err) => {
      res.status(500).send({ error: (err) ? err.toString() : 'Unknown error' });
    });
});


/**
*   METADATA
**/

app.get('/metadata', function (req, res) {
  const subjects = readJsonFileSync('subjects.json');
  const families = readJsonFileSync('families.json');
  const variables = readJsonFileSync('variables.json');
  const sampleData = readJsonFileSync('sample_data.json');

  //  group families by subjects
  const familiesBySubject = _.groupBy(families, 'subjectId');

  //  group variables by families
  const variablesByFamily = _.groupBy(variables, 'familyId');

  //  group sample data by variableIdfamilies
  const sampleDataByVariable = _.groupBy(sampleData, 'variableId');

  console.log(sampleDataByVariable);

  //  construct tree with subjects->families->variables
  const hierarchy = subjects.map((subject) => {
    //  get families for current subject
    const families = familiesBySubject[subject.subjectId] || [];

    //  add variables to families
    const familiesWithVars = families.map((family) => {
      //  get vars for current family
      const variables = variablesByFamily[family.familyId] || [];

      //  get sample data for vars
      const variablesWithData = variables.map((variable) => {
        const data = sampleDataByVariable[variable.variableId] || [];
        variable.data = data[0];
        return variable;
      });

      family.children = variablesWithData;
      return family;
    });

    subject.children = familiesWithVars;
    return subject;
  });

  res.render('metadata', { hierarchy });
});

app.get('/metadata/subjects', function (req, res) {
  const subjects = readJsonFileSync('subjects.json');
  res.render('metadata/subjects', { subjects });
});

app.get('/metadata/families', function (req, res) {
  const families = readJsonFileSync('families.json');
  res.render('metadata/families', { families });
});

app.get('/metadata/variables', function (req, res) {
  const variables = readJsonFileSync('variables.json');
  res.render('metadata/variables', { variables });
});


app.listen((process.env.PORT || 3000), function () {
  console.log('ATM data api listening on port 3000!');
});
