import fs from 'fs';
const s = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html', 'utf8');

const g1 = s.indexOf('data-framer-appear-id="gaygr9"');
console.log('gaygr9 1:', s.slice(g1 - 20, g1 + 80));
const g2 = s.indexOf('data-framer-appear-id="gaygr9"', g1 + 1);
console.log('gaygr9 2:', s.slice(g2 - 20, g2 + 80));

const b1 = s.indexOf('data-framer-appear-id="18mvsw1"');
console.log('18mvsw1 1:', s.slice(b1 - 20, b1 + 80));
