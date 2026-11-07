import fs from 'node:fs';

const xml = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/lucknow_wide_osm.xml', 'utf8');

console.log('Parsing wide nodes...');
const nodes = new Map(); // id -> [lon, lat]

const nodeRegex = /<node id="(\d+)"[^>]*lat="([^"]+)"[^>]*lon="([^"]+)"/g;
let m;
while ((m = nodeRegex.exec(xml)) !== null) {
  nodes.set(m[1], [parseFloat(m[3]), parseFloat(m[2])]); // [lon, lat]
}
console.log('Parsed total nodes:', nodes.size);

console.log('Parsing wide ways...');
const ways = [];
const wayRegex = /<way id="(\d+)"([\s\S]*?)<\/way>/g;
while ((m = wayRegex.exec(xml)) !== null) {
  const wayId = m[1];
  const wayBody = m[2];
  
  const ndRegex = /<nd ref="(\d+)"/g;
  const coords = [];
  let ndMatch;
  while ((ndMatch = ndRegex.exec(wayBody)) !== null) {
    const pt = nodes.get(ndMatch[1]);
    if (pt) coords.push(pt);
  }
  
  const tags = {};
  const tagRegex = /<tag k="([^"]+)" v="([^"]+)"/g;
  let tagMatch;
  while ((tagMatch = tagRegex.exec(wayBody)) !== null) {
    tags[tagMatch[1]] = tagMatch[2];
  }

  if (coords.length >= 2) {
    ways.push({ id: wayId, tags, coords });
  }
}
console.log('Parsed total valid ways with coords:', ways.length);

const highways = ways.filter(w => w.tags.highway);
const railways = ways.filter(w => w.tags.railway);
const waters = ways.filter(w => w.tags.waterway || w.tags.natural === 'water' || w.tags.natural === 'wetland');
const buildings = ways.filter(w => w.tags.building);
const landuses = ways.filter(w => w.tags.landuse);

console.log({
  highways: highways.length,
  railways: railways.length,
  waters: waters.length,
  buildings: buildings.length,
  landuses: landuses.length
});

fs.writeFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/parsed_wide_ways.json', JSON.stringify({
  nodesCount: nodes.size,
  highways,
  railways,
  waters,
  buildings,
  landuses
}, null, 2));
console.log('Saved parsed_wide_ways.json successfully!');
