import fs from 'fs';

const orig = fs.readFileSync('venues/boutique-n1.html', 'utf8');
console.log('venues/boutique-n1.html length:', orig.length);
console.log('Has footer:', orig.includes('<footer'));
const fStart = orig.indexOf('<footer');
const fEnd = orig.indexOf('</footer>') + 9;
console.log('Footer length in boutique-n1:', fEnd - fStart);
console.log('Has custom style in boutique-n1?', orig.includes('universal-grand-footer-styles'));
console.log('Scripts in boutique-n1:', [...orig.matchAll(/<script[^>]*src="([^"]+)"[^>]*>/g)].map(m => m[1]));
