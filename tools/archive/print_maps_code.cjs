const fs = require('fs');

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf8');

const idx = html.indexOf('Open in Maps');
if (idx !== -1) {
  console.log(html.substring(idx - 300, idx + 400));
}
