const fs = require('fs');
const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf8');

const sIdx = html.indexOf('grand-venue-names-sync');
if (sIdx !== -1) {
  const endIdx = html.indexOf('</script>', sIdx);
  console.log('--- grand-venue-names-sync script ---');
  console.log(html.substring(sIdx - 30, endIdx + 9));
}
