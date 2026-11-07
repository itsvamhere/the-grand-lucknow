import fs from 'fs';
const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/test_noframer.html', 'utf8');
const p = 368522;
const m = html.substring(p).match(/data-framer-name="[^"]*"/g);
console.log('Next section names:', m ? m.slice(0, 15) : 'none');
