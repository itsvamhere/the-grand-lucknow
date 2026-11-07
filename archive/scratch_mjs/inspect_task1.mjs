import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const html = fs.readFileSync(path.join(projectDir, 'index.html'), 'utf8');

// Font faces
const fontFaces = html.match(/@font-face\s*\{[^}]+\}/gi) || [];
console.log('--- Font Faces ---');
fontFaces.forEach(f => console.log(f.replace(/\s+/g, ' ')));

// Look for fonts in stylesheets or links
const links = html.match(/<link[^>]+rel=["']stylesheet["'][^>]*>/gi) || [];
console.log('--- Stylesheet Links ---');
links.forEach(l => console.log(l));

// Hero title / split-text
console.log('--- Searching for hero text elements ---');
const heroMatches = [...html.matchAll(/(<h1[^>]*>[\s\S]*?<\/h1>|<div[^>]*data-framer-name=["']Hero["'][\s\S]*?<\/div>)/gi)];
if (heroMatches.length > 0) {
  console.log('Found hero tag:', heroMatches[0][0].substring(0, 500));
}

// Search for 'THE GRAND' or 'CASA MOMO' or hero split-text in scripts/shared-lib.DganPNQZ.mjs
const sharedLibPath = path.join(projectDir, 'scripts', 'shared-lib.DganPNQZ.mjs');
if (fs.existsSync(sharedLibPath)) {
  const lib = fs.readFileSync(sharedLibPath, 'utf8');
  console.log('--- Shared lib check ---');
  const libMatches = [...lib.matchAll(/fontFamily:[^,}]+/g)];
  const uniqueLibFf = [...new Set(libMatches.map(m => m[0]))];
  console.log('Shared lib font families:', uniqueLibFf);
}
