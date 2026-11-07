const fs = require('fs');
const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html', 'utf8');

const navM = html.match(/<nav[\s\S]*?<\/nav>/);
if (navM) {
  console.log('Full nav in open-earth-lawn.html:');
  console.log(navM[0]);
}
