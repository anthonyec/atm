const express = require('express');
const fs = require('fs');
const exphbs  = require('express-handlebars');
const _  = require('lodash');

const fetchModule = require('./utils/fetch_xml_content');
const parserModule = require('./utils/data_parser');

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
  res.json({ msg: 'Hello World!' });
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
  fetchModule.fetchXmlContent(DATA_URL)
    .then((resp) => {
      try {
        res.json(parserModule.parseDataResponse(resp, fields));
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

  //  group families by subjects
  const familiesBySubject = _.groupBy(families, 'subjectId');

  //  group variables by families
  const variablesByFamily = _.groupBy(variables, 'familyId');

  //  construct tree with subjects->families->variables
  const hierarchy = subjects.map((subject) => {
    //  get families for current subject
    const families = familiesBySubject[subject.subjectId] || [];

    //  add variables to families
    const familiesWithVars = families.map((family) => {
      //  get vars for current family
      const variables = variablesByFamily[family.familyId] || [];
      family.children = variables;
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


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
