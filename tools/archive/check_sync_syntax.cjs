const fs = require('fs');
const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf8');

const sIdx = html.indexOf('grand-venue-names-sync');
if (sIdx !== -1) {
  console.log(html.substring(sIdx, sIdx + 1200));
}
