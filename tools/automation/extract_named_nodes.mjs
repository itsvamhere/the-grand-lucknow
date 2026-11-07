import fs from 'node:fs';

const xml = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/lucknow_wide_osm.xml', 'utf8');

const namedNodes = [];
const nodeRegex = /<node id="(\d+)"[^>]*lat="([^"]+)"[^>]*lon="([^"]+)"([\s\S]*?)<\/node>/g;
let m;
while ((m = nodeRegex.exec(xml)) !== null) {
  const id = m[1];
  const lat = parseFloat(m[2]);
  const lon = parseFloat(m[3]);
  const body = m[4];
  if (body.includes('<tag k="name"')) {
    const nameMatch = body.match(/<tag k="name" v="([^"]+)"/);
    const placeMatch = body.match(/<tag k="place" v="([^"]+)"/);
    const amenityMatch = body.match(/<tag k="amenity" v="([^"]+)"/);
    namedNodes.push({
      id,
      name: nameMatch ? nameMatch[1] : '',
      place: placeMatch ? placeMatch[1] : '',
      amenity: amenityMatch ? amenityMatch[1] : '',
      lat,
      lon
    });
  }
}
console.log('Total named nodes in wide bbox:', namedNodes.length);
console.log(namedNodes);
fs.writeFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/named_nodes.json', JSON.stringify(namedNodes, null, 2));
