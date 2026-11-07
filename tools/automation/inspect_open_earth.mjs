import fs from 'fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
const scriptIdx = html.indexOf('grand-subpage-engine-js');
console.log('scriptIdx:', scriptIdx);

if (scriptIdx !== -1) {
  console.log('--- Script snippet ---');
  console.log(html.slice(scriptIdx - 50, scriptIdx + 2000));
}

// Also let's find the H1 in open-earth-lawn.html
const h1Idx = html.indexOf('<h1');
console.log('h1Idx:', h1Idx);
if (h1Idx !== -1) {
  console.log('--- H1 snippet ---');
  console.log(html.slice(h1Idx - 100, h1Idx + 1500));
}
