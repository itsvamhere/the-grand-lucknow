import fs from 'fs';

const h = fs.readFileSync('tools/casamomo_live_subpage.html', 'utf8');

const sIdx = h.indexOf('class="framer-1n8t7q3"');
console.log(h.slice(sIdx - 100, sIdx + 800));
