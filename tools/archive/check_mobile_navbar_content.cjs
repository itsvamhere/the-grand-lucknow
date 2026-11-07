const fs = require('fs');

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/venue-n1.html', 'utf8');

const mIdx = html.indexOf('name="Mobile Navbar"');
if (mIdx !== -1) {
  console.log(html.substring(mIdx, mIdx + 1000));
}
