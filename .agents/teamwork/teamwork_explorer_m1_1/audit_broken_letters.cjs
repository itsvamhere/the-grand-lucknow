const fs = require('fs');
const path = require('path');

const baseDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';
const idxHtml = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8');
const subHtml = fs.readFileSync(path.join(baseDir, 'venues/open-earth-lawn.html'), 'utf8');

function getFooter(html) {
  const start = html.indexOf('<footer');
  const end = html.indexOf('</footer>', start) + 9;
  return html.substring(start, end);
}

const fIdx = getFooter(idxHtml);
const fSub = getFooter(subHtml);

function getLink1And2(fHtml) {
  const vIdx = fHtml.indexOf('href="/venues.html"') !== -1 ? fHtml.indexOf('href="/venues.html"') : fHtml.indexOf('href="./venues"');
  const aIdx = fHtml.indexOf('href="/about.html"') !== -1 ? fHtml.indexOf('href="/about.html"') : fHtml.indexOf('href="./about"');
  return {
    venuesSnippet: fHtml.substring(vIdx - 50, vIdx + 1200),
    aboutSnippet: fHtml.substring(aIdx - 50, aIdx + 1200)
  };
}

console.log('=== SUBPAGE LINK 1 (VENUES) ===');
console.log(getLink1And2(fSub).venuesSnippet);
console.log('=== SUBPAGE LINK 2 (ABOUT) ===');
console.log(getLink1And2(fSub).aboutSnippet);
