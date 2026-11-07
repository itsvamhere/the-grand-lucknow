import fs from 'fs';

const idx = fs.readFileSync('index.html', 'utf8');
const lawn = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const idxScripts = [...idx.matchAll(/<script[^>]*src="([^"]+)"[^>]*>/g)].map(m => m[1]);
const lawnScripts = [...lawn.matchAll(/<script[^>]*src="([^"]+)"[^>]*>/g)].map(m => m[1]);

console.log('Index scripts (', idxScripts.length, '):', idxScripts);
console.log('---');
console.log('Lawn scripts (', lawnScripts.length, '):', lawnScripts);
