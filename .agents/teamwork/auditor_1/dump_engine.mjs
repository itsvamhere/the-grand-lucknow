import fs from 'fs';
const s = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html', 'utf8');
const m = s.match(/<script id="grand-subpage-engine-js">([\s\S]*?)<\/script>/);
fs.writeFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/.agents/teamwork/auditor_1/extracted_engine.js', m[1]);
console.log('Wrote extracted_engine.js, size:', m[1].length);
