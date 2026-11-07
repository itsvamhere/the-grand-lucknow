import fs from 'node:fs';

const s = fs.readFileSync('scripts/master_universal_footer_snippet.html', 'utf8');
const hrefs = s.match(/href="[^"]*"/g) || [];
console.log('Hrefs in footer:', [...new Set(hrefs)]);
