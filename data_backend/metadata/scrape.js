const xml2js = require('xml2js');
const util = require('util');
const fs = require('fs');
const _ = require('lodash');

const SAMPLE_DATA_URL = 'data/sample_data.json';
const FAMILIES_FILE_URL = 'data/families.json';
const VARIABLES_FILE_URL = 'data/variables.json';

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

const getContent = function(url) {
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

const getXmlContent = function(url) {
  return getContent(url)
    .then((response) => {
      return parseXmlString(response);
    });
};

const storeSubjects = function(subjectXml) {
  const response = subjectXml['ns2:GetSubjectsResponseElement'];
  if (!response || !response['Subjects'] || !response['Subjects'][0] ||
    !response['Subjects'][0]['Subject'] ) {
    throw(new Error('Not valid subject xml'));
  }

  //  xml is valid
  const subjects = response['Subjects'][0]['Subject'];

  const result = [];
  subjects.forEach((subject) => {
    const subjectId = subject['SubjectId'][0];
    const subjectName = subject['Name'][0];

    result.push({subjectId, name: subjectName });
  });

  fs.writeFile('data/subjects.json', JSON.stringify(result), 'utf8');
};

const storeFamily = function(familyXml, subjectId, clear = false) {
  const response = familyXml['ns2:GetDatasetFamiliesResponseElement'];
  if (!response || !response['DSFamilies'] || !response['DSFamilies'][0] ||
    !response['DSFamilies'][0]['DSFamily'] ) {
    throw(new Error('Not valid family xml'));
  }

  //  xml is valid
  const families = familyXml['ns2:GetDatasetFamiliesResponseElement']['DSFamilies'][0]['DSFamily'];

  const result = [];
  families.forEach((family) => {
    const familyId = family['DSFamilyId'][0];
    const familyName = family['Name'][0];
    const familyStartDate = family['DateRange'][0]['StartDate'][0];
    const familyEndDate = family['DateRange'][0]['EndDate'][0];

    result.push({familyId, subjectId, name: familyName, startDate: familyStartDate, endDate: familyEndDate, });
  });

  console.log('result');
  console.log(result);

  if (clear) {
    //  start writing new file
    fs.writeFile(FAMILIES_FILE_URL, JSON.stringify(result), 'utf8');
  } else {
    //  have to open json parse it and append
    const file = fs.readFileSync(FAMILIES_FILE_URL, 'utf8');
    const existingFamilites = JSON.parse(file);
    const merge = existingFamilites.concat(result);

    fs.writeFile(FAMILIES_FILE_URL, JSON.stringify(merge), 'utf8');
  }

  console.log('Stored family JSON');
};

const storeVariable = function(variableXml, familyId, clear = false) {
  const response = variableXml['ns2:GetVariablesResponseElement'];
  if (!response || !response['VarFamilies'] || !response['VarFamilies'][0] ||
    !response['VarFamilies'][0]['VarFamily'] ) {
    throw(new Error('Not valid variable xml'));
  }

  //  xml is valid
  const variables = variableXml['ns2:GetVariablesResponseElement']['VarFamilies'][0]['VarFamily'];

  const result = [];
  variables.forEach((variable) => {
    const variableId = variable['VarFamilyId'][0];
    const varName = variable['Name'][0];
    const varStartDate = variable['DateRange'][0]['StartDate'][0];
    const varEndDate = variable['DateRange'][0]['EndDate'][0];

    result.push({variableId, familyId, name: varName, startDate: varStartDate, endDate: varEndDate });
  });

  if (clear) {
    //  start writing new file
    fs.writeFile(VARIABLES_FILE_URL, JSON.stringify(result), 'utf8');
  } else {
    //  have to open json parse it and append
    const file = fs.readFileSync(VARIABLES_FILE_URL, 'utf8');
    const existingVariables = JSON.parse(file);
    const merge = existingVariables.concat(result);

    fs.writeFile(VARIABLES_FILE_URL, JSON.stringify(merge), 'utf8');
  }

  console.log('Stored family JSON');
};


const storeSampleData = function(sampleData, variableId) {
  //  have to open json parse it and append
  const file = fs.readFileSync(SAMPLE_DATA_URL, 'utf8');
  const existingData = JSON.parse(file);

  sampleData.variableId = variableId;
  const merge = existingData.concat([sampleData]);

  fs.writeFile(SAMPLE_DATA_URL, JSON.stringify(merge), 'utf8');
  console.log('Stored sample data');
};

const getSubjects = function() {
  //  subjects
  const subjectUrl = 'http://neighbourhood.statistics.gov.uk/NDE2/Disco/GetSubjects';
  getXmlContent(subjectUrl)
    .then((xml) => {
      storeSubjects(xml);
    })
    .catch((err) => {
      console.error(err);
    });
};

const getFamily = function(subjectId, clear = false) {
  //  family
  const familyUrl = `http://neighbourhood.statistics.gov.uk/NDE2/Disco/GetDatasetFamilies?SubjectId=${subjectId}`;
  console.log(`Fetching family url:${familyUrl}`);

  getXmlContent(familyUrl)
    .then((xml) => {
      storeFamily(xml, subjectId, clear);
    })
    .catch((err) => {
      console.error(err);
    });
};

const getFamilies = function() {
  const subjects = JSON.parse(fs.readFileSync('data/subjects.json', 'utf8'));

  let index = 0;
  subjects.forEach((subject) => {
    const subjectId = subject.subjectId;
    const clear = index === 0;

    getFamily(subjectId, clear);
    index++;
  });
};

const getVariable = function(familyId, clear = false) {
  return new Promise((resolve, reject) => {
    //  variable
    const variableUrl = `http://neighbourhood.statistics.gov.uk/NDE2/Disco/GetVariables?DSFamilyId=${familyId}`;
    console.log(`Fetching variable url:${variableUrl}`);

    getXmlContent(variableUrl)
      .then((xml) => {
        storeVariable(xml, familyId, clear);
        resolve();
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
};

const getVariables = function() {
  const families = JSON.parse(fs.readFileSync('data/families.json', 'utf8'));
  let fetchedIndex = 0;
  let nextFamilyId;

  function callGetVariable(familyId, clear) {
    function next() {
      //  if not last variable call next
      if (fetchedIndex < families.length) {
        fetchedIndex++;
        nextFamilyId = families[fetchedIndex].familyId;
        callGetVariable(nextFamilyId);
      }
    }

    getVariable(familyId)
      .then(() => {
        next();
      })
      .catch(() => {
        next();
      });
  }

  if (families.length) {
    nextFamilyId = families[0].familyId;
    callGetVariable(nextFamilyId, true);
  }
};

const getSampleDatum = function(variableId, areaId) {
  return new Promise((resolve, reject) => {
    //  variable
    const API_DATA_URL = `http://localhost:3000/api/v1/variables/${variableId}?areaId=${areaId}&fields=title,description,value`;
    console.log(`Fetching sample data from: ${API_DATA_URL}`);

    getContent(API_DATA_URL)
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
}

const getSampleData = function() {
  const areaId = '6274999'; // london //  '6275114'; // hackney

  // 1) open existing sample data
  const sampleDataFile = fs.readFileSync(SAMPLE_DATA_URL, 'utf8');
  const sampleDataJson = (sampleDataFile)? JSON.parse(sampleDataFile) : [];

  //  see which variables we already have
  const sampleDataVariables = Object.keys(
    _.groupBy(sampleDataJson, 'variableId')
  );

  //  2) go through all variables stored in
  const variables = JSON.parse(fs.readFileSync(VARIABLES_FILE_URL, 'utf8'));

  let fetchedIndex = 0;
  let nextVariableId;

  function callGetSampleDatum(variableId) {

    function next() {
      fetchedIndex++;

      if (fetchedIndex < variables.length) {
        nextVariableId = variables[fetchedIndex].variableId;

        //  do we have data for it already?
        if (nextVariableId && sampleDataVariables.indexOf(nextVariableId) > -1) {
          //  yep, move on
          next();
        } else {
          callGetSampleDatum(nextVariableId);
        }

      }

    }

    getSampleDatum(variableId, areaId)
      .then((sampleData) => {
        //  if not last variable call next
        storeSampleData(JSON.parse(sampleData), nextVariableId);

        //  find next variable id to add
        next();
      })
      .catch((err) => {
        console.error('Error getting sample data', err.toString());
        next();
      });
  }

  if (variables.length) {
    nextVariableId = variables[0].variableId;
    callGetSampleDatum(nextVariableId);
  }

}

//  getSubjects();
//  getFamilies();
//  getVariables();

// getSampleDatum(9421, 6275114)
//   .then((resp) => {
//     console.log('resp', resp);
//   });

getSampleData();

// getVariable(2506, true);
// getVariable(2525);

// const familyId = 1893;
// getVariable(familyId);
//  getFamily(null, true);

