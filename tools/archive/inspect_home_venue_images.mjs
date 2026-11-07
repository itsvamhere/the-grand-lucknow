import fs from 'fs';

const homeHtml = fs.readFileSync('index.html', 'utf8');

// Find Grassland Gala in home page
const gMatches = [...homeHtml.matchAll(/Grassland Gala/gi)];
console.log('Grassland Gala occurrences in home:', gMatches.length);

const galIdx = homeHtml.indexOf('Grassland Gala');
if (galIdx !== -1) {
  console.log('Snippet around Grassland Gala in home:\n', homeHtml.slice(Math.max(0, galIdx - 400), galIdx + 600));
}

// Find Garden Galaxy in home page
const ggIdx = homeHtml.indexOf('Garden Galaxy');
if (ggIdx !== -1) {
  console.log('Snippet around Garden Galaxy in home:\n', homeHtml.slice(Math.max(0, ggIdx - 400), ggIdx + 600));
}
