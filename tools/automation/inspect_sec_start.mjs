import fs from 'node:fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
const loc = 305970;
const secStart = html.lastIndexOf('<section', loc);
console.log('Section start idx:', secStart);
console.log(html.slice(secStart, secStart + 1200));
