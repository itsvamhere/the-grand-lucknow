import fs from 'node:fs';

const xml = fs.readFileSync('scripts/lucknow_full_osm.xml', 'utf8');

// Find bounds or bbox in XML
const boundsM = xml.match(/<bounds[^>]+>/);
console.log('Bounds:', boundsM ? boundsM[0] : 'No bounds tag');

// Let's count nodes, ways, relations
const nodesCount = (xml.match(/<node /g) || []).length;
const waysCount = (xml.match(/<way /g) || []).length;
console.log('Nodes count:', nodesCount, 'Ways count:', waysCount);

// Sample names
const names = [];
const nameRegex = /k="name"[^v]*v="([^"]+)"/g;
let m;
while ((m = nameRegex.exec(xml)) !== null && names.length < 30) {
  names.push(m[1]);
}
console.log('Sample names in XML:', names);
