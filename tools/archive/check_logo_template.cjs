const fs = require('fs');

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/venue-n1.html', 'utf8');

const tStart = html.indexOf('id="svg-1267704399_390"');
if (tStart !== -1) {
  const tEnd = html.indexOf('</g>', tStart);
  console.log(html.substring(tStart - 10, tEnd + 4));
} else {
  console.log('Not found');
}
