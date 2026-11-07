import fs from 'fs';
const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf8');

// Check the background color of locations section
const m = html.match(/--token-8ecd7124-9686-4bd8-bf72-4f81314652d2[^;]*/);
console.log('Pearl Beige token:', m ? m[0] : 'not found');

const locSecMatch = html.match(/\.framer-10bxu26[^{]*\{[^}]*\}/g);
console.log('Locations section CSS:', locSecMatch);
