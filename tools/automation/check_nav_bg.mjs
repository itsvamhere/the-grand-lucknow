import fs from 'node:fs';

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html', 'utf8');

// Find header style
const idx = html.indexOf('framer-1i47qog');
console.log(html.slice(idx - 50, idx + 300));
