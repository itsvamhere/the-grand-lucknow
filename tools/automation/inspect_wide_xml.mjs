import fs from 'node:fs';

const xml = fs.readFileSync('scripts/lucknow_wide_osm.xml', 'utf8');
const boundsM = xml.match(/<bounds[^>]+>/);
console.log('Bounds:', boundsM ? boundsM[0] : 'None');

const nodeCount = (xml.match(/<node /g) || []).length;
const wayCount = (xml.match(/<way /g) || []).length;
console.log('Nodes:', nodeCount, 'Ways:', wayCount);

// Count highway types
const highwayRegex = /<tag [^>]*k="highway"[^>]*v="([^"]+)"/g;
let m;
const types = {};
while ((m = highwayRegex.exec(xml)) !== null) {
  types[m[1]] = (types[m[1]] || 0) + 1;
}
console.log('Highway types:', types);

// Places
const placeRegex = /<tag [^>]*k="place"[^>]*v="([^"]+)"/g;
const places = {};
while ((m = placeRegex.exec(xml)) !== null) {
  places[m[1]] = (places[m[1]] || 0) + 1;
}
console.log('Places:', places);
