import fs from 'fs';

// Check how casamomo does it on boutique-n1.html
const casaHtml = fs.readFileSync('apartments/boutique-n1.html', 'utf8');

// Find Sticky Header Text
const sIdx = casaHtml.indexOf('Sticky Header Text');
console.log('casa sIdx:', sIdx);
if (sIdx !== -1) {
  console.log(casaHtml.slice(sIdx - 100, sIdx + 1500));
}

// Check the H1 in boutique-n1.html
const casaH1 = casaHtml.indexOf('<h1');
console.log('casa h1Idx:', casaH1);
if (casaH1 !== -1) {
  console.log(casaHtml.slice(casaH1 - 100, casaH1 + 1500));
}
