const fs = require('fs');

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/venue-n1.html', 'utf8');

const tStart = html.indexOf('id="svg-1334768056_3843"');
console.log('tStart:', tStart);
if (tStart !== -1) {
  const tEnd = html.indexOf('</g>', tStart);
  console.log(html.substring(tStart - 10, tEnd + 4));
}
