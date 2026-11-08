import fs from 'fs';

const up = fs.readFileSync('archive/upstream_html/upstream_boutique-n1.html', 'utf8');
const fStart = up.indexOf('<footer');
console.log('Upstream boutique-n1 footer tag:');
console.log(up.slice(fStart, fStart + 200));
