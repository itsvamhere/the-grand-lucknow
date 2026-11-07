const fs = require('fs');
const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf8');

const sIdx = html.indexOf('grand-locations-override');
if (sIdx !== -1) {
  const endIdx = html.indexOf('</script>', sIdx);
  console.log('--- grand-locations-override script ---');
  console.log(html.substring(sIdx - 30, endIdx + 9));
}
