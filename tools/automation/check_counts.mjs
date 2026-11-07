import fs from 'node:fs';
const data = JSON.parse(fs.readFileSync('scripts/parsed_wide_ways.json', 'utf8'));
console.log('nodesCount:', data.nodesCount);
console.log('highways:', data.highways.length);
console.log('railways:', data.railways.length);
console.log('waters:', data.waters.length);
console.log('buildings:', data.buildings.length);
console.log('landuses:', data.landuses.length);
