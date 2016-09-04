const express = require('express');
const fs = require('fs');
const exphbs  = require('express-handlebars');

const readJsonFileSync = function(filepath){
  const dir = 'metadata/data/';
  const file = fs.readFileSync(`${dir}${filepath}`, 'utf-8');
  return JSON.parse(file);
}

const app = express();
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/metadata', function (req, res) {
  const subjects = readJsonFileSync('subjects.json');

  res.render('metadata', {subjects: arr});
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
