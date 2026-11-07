import fs from 'fs';

const idx = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf8');
const lawn = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html', 'utf8');

function findToken(html, name) {
  const re = new RegExp(`${name}[^;}]*`, 'g');
  return [...html.matchAll(re)].map(m => m[0]);
}

console.log('Index tokens:', findToken(idx, '--token-8ecd7124-9686-4bd8-bf72-4f81314652d2'));
console.log('Lawn tokens:', findToken(lawn, '--token-8ecd7124-9686-4bd8-bf72-4f81314652d2'));
