import fs from 'fs';

const s = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf8');
console.log('Contains grand-subpage-engine:', s.includes('grand-subpage-engine'));
console.log('Contains grand-hero-letter:', s.includes('grand-hero-letter'));
const scriptIds = [...s.matchAll(/<script[^>]*id="([^"]+)"/g)].map(m => m[1]);
console.log('Script IDs in index.html:', scriptIds);
