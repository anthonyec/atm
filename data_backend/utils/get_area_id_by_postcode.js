const { fetchXmlContent } = require('./fetch_xml_content');

const parseFindAreaXml = function(xml, levelType) {
  if (!xml['ns2:FindAreasResponseElement']) {
    throw new ReferenceError('XML is missing root "ns2:FindAreasResponseElement" element');
  }

  const rootEl = xml['ns2:FindAreasResponseElement'];

  if (!rootEl['AreaFallsWithins'] || !rootEl['AreaFallsWithins'][0]) {
    throw new ReferenceError('XML is missing "AreaFallsWithins" element');
  }

  const areaFallsWithins = rootEl['AreaFallsWithins'][0];

  if (!areaFallsWithins['AreaFallsWithin']) {
    throw new ReferenceError('XML is missing "AreaFallsWithin" element');
  }

  const areaFallWithin = areaFallsWithins['AreaFallsWithin']

  console.log('levelType', levelType);

  //  filter on nested area -> levelTypeId
  const foundAreas = areaFallWithin.filter((areaFall) => {
    if (areaFall['Area'] && areaFall['Area'][0]) {
      const area = areaFall['Area'][0];
      if (area['LevelTypeId'] && area['LevelTypeId'][0]) {
        const levelTypeId = area['LevelTypeId'][0];
        return levelTypeId == levelType;
      }
    }

    //  didn't have correct els
    return false;
  });

  let areaId = -1;

  //  did we find something?
  if (foundAreas && foundAreas.length) {
    // we did, extract areaId
    const foundArea = foundAreas[0];

    if (foundArea['Area'] && foundArea['Area'][0]) {
      const area = foundArea['Area'][0];

      if (area['AreaId'] && area['AreaId'][0]) {
        areaId = area['AreaId'][0];
      }
    }

  }

  return areaId;
};

exports.getAreaIdByPostcode = function(postcode, areaLevel) {
  return new Promise((resolve, reject) => {
    if (!postcode) {
      reject(new ReferenceError('Missing postcode param'));
    }

    const API_URL = `http://neighbourhood.statistics.gov.uk/NDE2/Disco/FindAreas?Postcode=${postcode}`;
    fetchXmlContent(API_URL)
      .then((xml) => {
        try {
          resolve(parseFindAreaXml(xml, areaLevel));
        } catch(err) {
          reject(new Error(`Error parsing FindAreas response: ${err.toString()}`));
        }
      })
      .catch((err) => {
        reject(new Error('Error fetching FindAreas'));
      })

  });
}

// ns2:FindAreasResponseElement xmlns="http://neighbourhood.statistics.gov.uk/nde/v1-0/discoverystructs" xmlns:ns2="http://neighbourhood.statistics.gov.uk/nde/discoveryservice">
// <AreaFallsWithins>
// <AreaFallsWithin>...</AreaFallsWithin>
// <AreaFallsWithin>
// <FallsWithin>
// <Area>
// <LevelTypeId>13</LevelTypeId>
// <HierarchyId>26</HierarchyId>
// <AreaId>6275114</AreaId>
// <Name>Hackney</Name>
// </Area>
// </FallsWithin>
// <Area>
// <LevelTypeId>141</LevelTypeId>
// <HierarchyId>26</HierarchyId>
// <AreaId>6315338</AreaId>
// <Name>Hackney 023G</Name>
// </Area>
// </AreaFallsWithin>
// <AreaFallsWithin>
// <FallsWithin>
// <Area>
// <LevelTypeId>13</LevelTypeId>
// <HierarchyId>26</HierarchyId>
// <AreaId>6275114</AreaId>
// <Name>Hackney</Name>
// </Area>
// </FallsWithin>
// <Area>
// <LevelTypeId>140</LevelTypeId>
// <HierarchyId>26</HierarchyId>
// <AreaId>6275702</AreaId>
// <Name>Hackney 023</Name>
// </Area>
// </AreaFallsWithin>
// <AreaFallsWithin>
// <FallsWithin xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:nil="true"/>
// <Area>
// <LevelTypeId>13</LevelTypeId>
// <HierarchyId>26</HierarchyId>
// <AreaId>6275114</AreaId>
// <Name>Hackney</Name>
// </Area>
// </AreaFallsWithin>
// <AreaFallsWithin>
// <FallsWithin xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:nil="true"/>
// <Area>
// <LevelTypeId>11</LevelTypeId>
// <HierarchyId>26</HierarchyId>
// <AreaId>6274999</AreaId>
// <Name>London</Name>
// </Area>
// </AreaFallsWithin>
// <AreaFallsWithin>
// <FallsWithin xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:nil="true"/>
// <Area>...</Area>
// </AreaFallsWithin>
// <AreaFallsWithin>
// <FallsWithin xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:nil="true"/>
// <Area>
// <LevelTypeId>9</LevelTypeId>
// <HierarchyId>26</HierarchyId>
// <AreaId>6274990</AreaId>
// <Name>England and Wales</Name>
// </Area>
// </AreaFallsWithin>
// <AreaFallsWithin>
// <FallsWithin xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:nil="true"/>
// <Area>
// <LevelTypeId>8</LevelTypeId>
// <HierarchyId>26</HierarchyId>
// <AreaId>6274989</AreaId>
// <Name>Great Britain</Name>
// </Area>
// </AreaFallsWithin>
// <AreaFallsWithin>
// <FallsWithin xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:nil="true"/>
// <Area>
// <LevelTypeId>7</LevelTypeId>
// <HierarchyId>26</HierarchyId>
// <AreaId>6274988</AreaId>
// <Name>United Kingdom</Name>
// </Area>
// </AreaFallsWithin>
// </AreaFallsWithins>
// </ns2:FindAreasResponseElement>

