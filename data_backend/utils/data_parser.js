const util = require('util');

exports.parseDataResponse = function(xml, fields = []) {
  if (!xml['ns2:getDataCubeResponseElement']) {
    throw new ReferenceError('XML is missing root "ns2:getDataCubeResponseElement" element');
  }

  const rootEl = xml['ns2:getDataCubeResponseElement'];

  if (!rootEl['ns3:Datasets'] || !rootEl['ns3:Datasets'][0]) {
    throw new ReferenceError('XML is missing "ns3:Datasets" element');
  }

  const datasets = rootEl['ns3:Datasets'][0];

  if (!datasets['ns3:Dataset'] || !datasets['ns3:Dataset'][0]) {
    throw new ReferenceError('XML is missing "ns3:Dataset" element');
  }

  const dataset = datasets['ns3:Dataset'][0];

  if (!dataset['ns3:DatasetItems'] || !dataset['ns3:DatasetItems'][0]) {
    throw new ReferenceError('XML is missing "ns3:DatasetItems" element');
  }

  const datasetItems = dataset['ns3:DatasetItems'][0];

  if (!datasetItems['ns3:DatasetItem'] || !datasetItems['ns3:DatasetItem'][0]) {
    throw new ReferenceError('XML is missing "ns3:DatasetItems" element');
  }

  const datasetItem = datasetItems['ns3:DatasetItem'][0];

  if (!datasetItem['ns3:Value'] || !datasetItem['ns3:Value'][0]) {
    throw new ReferenceError('XML is missing "ns3:Value" element');
  }

  //  getting specific fields or just default
  const value = datasetItem['ns3:Value'][0];
  if (!fields || fields.length === 0) {
    //  not getting specific values, just return value
    return { value };
  }

  //  returning specific fields
  const data = {};

  if (fields.indexOf('value') !== -1) {
    data.value = value;
  }

  //  do we need extra info from dataset metadata?
  if (fields.indexOf('description') !== -1 || fields.indexOf('title') !== -1) {
    //  fetch description
    if (dataset['ns3:DatasetDetails'] && dataset['ns3:DatasetDetails'][0]) {
      const datasetDetail = dataset['ns3:DatasetDetails'][0];

      if (datasetDetail['ns3:DatasetMetadata'] && datasetDetail['ns3:DatasetMetadata'][0]) {
        const datasetMetadata = datasetDetail['ns3:DatasetMetadata'][0];

        if (fields.indexOf('title') !== -1) {
          const title = datasetMetadata['ns3:Title'][0] || '';
          data.title = title;
        }

        if (fields.indexOf('description') !== -1) {
          const description = datasetMetadata['ns3:Description'][0] || '';
          data.description = description;
        }
      }

    }
  }

  return data;
}

