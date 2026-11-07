import fs from 'fs';

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/upstream_boutique-n1.html', 'utf8');

// Find where "Location" and map is defined
const locIdx = html.indexOf('name="Location Map"');
console.log('Location Map index:', locIdx);
if (locIdx !== -1) {
  console.log('--- Map snippet in upstream ---');
  console.log(html.substring(locIdx - 100, locIdx + 1200));
}

// Find scripts related to map
const scripts = [...html.matchAll(/src="([^"]*(?:map|leaflet|mapbox|google|location)[^"]*)"/gi)];
console.log('Map scripts found:', scripts.map(s => s[1]));
