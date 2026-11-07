import fs from 'node:fs';

const xml = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/lucknow_osm.xml', 'utf8');

const nodeMatches = xml.match(/<node id="(\d+)" lat="([^"]+)" lon="([^"]+)"/g) || [];
console.log('Total nodes:', nodeMatches.length);

const wayMatches = xml.match(/<way id="\d+"/g) || [];
console.log('Total ways:', wayMatches.length);

const named = [];
const wayBlocks = xml.split('</way>');
for (const b of wayBlocks) {
  if (b.includes('<tag k="name"')) {
    const nameMatch = b.match(/<tag k="name" v="([^"]+)"/);
    const hwMatch = b.match(/<tag k="highway" v="([^"]+)"/);
    const buildingMatch = b.match(/<tag k="building" v="([^"]+)"/);
    const amenityMatch = b.match(/<tag k="amenity" v="([^"]+)"/);
    if (nameMatch) {
      named.push({ type: 'way', name: nameMatch[1], hw: hwMatch?.[1], building: buildingMatch?.[1], amenity: amenityMatch?.[1] });
    }
  }
}
const nodeBlocks = xml.split('</node>');
for (const b of nodeBlocks) {
  if (b.includes('<tag k="name"')) {
    const nameMatch = b.match(/<tag k="name" v="([^"]+)"/);
    const placeMatch = b.match(/<tag k="place" v="([^"]+)"/);
    const amenityMatch = b.match(/<tag k="amenity" v="([^"]+)"/);
    const latMatch = b.match(/lat="([^"]+)"/);
    const lonMatch = b.match(/lon="([^"]+)"/);
    if (nameMatch) {
      named.push({ type: 'node', name: nameMatch[1], place: placeMatch?.[1], amenity: amenityMatch?.[1], lat: latMatch?.[1], lon: lonMatch?.[1] });
    }
  }
}
console.log('Named elements in bbox (first 30):', named.slice(0, 30));
console.log('Total named elements:', named.length);
