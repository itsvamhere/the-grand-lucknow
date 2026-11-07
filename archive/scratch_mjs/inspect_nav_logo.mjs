import fs from 'fs';

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf8');

// Find navbar logo definition
const logoIdx = html.indexOf('data-framer-name="Logo"');
console.log(html.substring(logoIdx - 200, logoIdx + 800));
