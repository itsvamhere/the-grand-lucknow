import fs from 'node:fs';

let html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

html = html.replaceAll('osm_match_v2', 'osm_match_v3');

fs.writeFileSync('venues/open-earth-lawn.html', html);
console.log('Updated open-earth-lawn.html with ?v=osm_match_v3');
