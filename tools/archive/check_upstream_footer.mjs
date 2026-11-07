import fs from 'fs';

const up = fs.readFileSync('archive/upstream_html/upstream_boutique-n1.html', 'utf8');
const fStart = up.indexOf('<footer');
const fEnd = up.indexOf('</footer>') + 9;
console.log('Upstream boutique-n1 footer length:', fEnd - fStart);
console.log('Upstream scripts:', [...up.matchAll(/<script[^>]*src="([^"]+)"[^>]*>/g)].map(m => m[1]));
console.log('Has svg870196829_4253?', up.includes('svg870196829_4253'));
