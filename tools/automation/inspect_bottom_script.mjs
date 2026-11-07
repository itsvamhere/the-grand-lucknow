import fs from 'node:fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const scriptIdx = html.lastIndexOf('otherHeadings');
console.log(html.slice(scriptIdx - 300, scriptIdx + 600));
