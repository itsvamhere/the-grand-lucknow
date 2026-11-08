import fs from 'fs';

const up = fs.readFileSync('archive/upstream_html/upstream_boutique-n1.html', 'utf8');
const fStart = up.indexOf('<footer');
const fEnd = up.indexOf('</footer>') + 9;
const footer = up.slice(fStart, fEnd);

console.log('Upstream footer start:');
console.log(footer.slice(0, 400));
console.log('---');
console.log('Upstream footer end:');
console.log(footer.slice(-400));

// Check data-framer-name
const names = [...footer.matchAll(/data-framer-name="([^"]+)"/g)].map(m => m[1]);
console.log('Names:', names);
