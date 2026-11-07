import fs from 'node:fs';

const xml1 = fs.readFileSync('scripts/lucknow_wide_osm.xml', 'utf8');

function findInXml(query) {
  const matches = [];
  const tagRegex = new RegExp('<tag [^>]*k="(?:name|name:en|amenity|tourism|building)"[^>]*v="([^"]*' + query + '[^"]*)"', 'gi');
  let m;
  while ((m = tagRegex.exec(xml1)) !== null) {
    const idx = m.index;
    const nodeStart = xml1.lastIndexOf('<node', idx);
    const nodeEnd = xml1.indexOf('</node>', idx);
    if (nodeStart !== -1 && nodeEnd !== -1 && nodeStart < idx && idx < nodeEnd) {
      const nodeSnippet = xml1.slice(nodeStart, nodeEnd);
      const latM = nodeSnippet.match(/lat="([^"]+)"/);
      const lonM = nodeSnippet.match(/lon="([^"]+)"/);
      matches.push({ type: 'node', val: m[1], lat: latM ? parseFloat(latM[1]) : null, lon: lonM ? parseFloat(lonM[1]) : null });
    }
    const wayStart = xml1.lastIndexOf('<way', idx);
    const wayEnd = xml1.indexOf('</way>', idx);
    if (wayStart !== -1 && wayEnd !== -1 && wayStart < idx && idx < wayEnd) {
      matches.push({ type: 'way', val: m[1] });
    }
  }
  return matches;
}

['Grand', 'Orchid', 'Patel', 'Ayurvedic', 'Gaura', 'Bindaua', 'Ahmadpur', 'Kankaha', 'Badan'].forEach(q => {
  console.log(q + ':', findInXml(q));
});
