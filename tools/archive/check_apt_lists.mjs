import fs from 'fs';
const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/test_noframer.html', 'utf8');
const p = html.indexOf('data-framer-name="Apartment Lists"');
console.log('Apartment Lists at:', p);
console.log(html.substring(p - 300, p));
