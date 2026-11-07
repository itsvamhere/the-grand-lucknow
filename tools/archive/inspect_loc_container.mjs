import fs from 'fs';
const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/test_noframer.html', 'utf8');
const p = html.indexOf('data-framer-name="Location"');
console.log(html.substring(p, p + 1200));
