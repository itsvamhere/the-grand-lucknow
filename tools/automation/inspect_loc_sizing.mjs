import fs from 'node:fs';

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html', 'utf8');

const locIdx = html.indexOf('data-framer-name="Location"');
console.log('Location index:', locIdx);
console.log(html.substring(locIdx - 100, locIdx + 800));

// Find the CSS classes for Location
const regex = /\.framer-tfszgi[^{]*\{[^}]*\}/g;
const matches = [...html.matchAll(regex)].map(m => m[0]);
console.log('framer-tfszgi styles:', matches);

const regex2 = /\.framer-s6uv36[^{]*\{[^}]*\}/g;
const matches2 = [...html.matchAll(regex2)].map(m => m[0]);
console.log('framer-s6uv36 styles:', matches2);
