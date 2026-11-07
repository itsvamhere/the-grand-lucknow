import fs from 'fs';
const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/test_noframer.html', 'utf8');
const p = html.indexOf('data-framer-name="Location"');
const end = html.indexOf('data-framer-name="Other Places to Stay"', p);
console.log('Location section span:', p, end);
console.log('Length:', end - p);
