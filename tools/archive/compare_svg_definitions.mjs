import fs from 'fs';
import path from 'path';

const ROOT = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const indexHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

const m = indexHtml.match(/<svg[^>]*id="svg870196829_4253"[\s\S]*?<\/svg>/i);
console.log('svg870196829_4253:');
console.log(m[0].slice(0, 300));

const desktopSvg = fs.readFileSync(path.join(ROOT, 'tools', 'archive', 'the_grand_footer_desktop.svg'), 'utf8');
console.log('the_grand_footer_desktop.svg:');
console.log(desktopSvg.slice(0, 300));
