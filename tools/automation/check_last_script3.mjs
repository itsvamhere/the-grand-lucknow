import fs from 'node:fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const lastScript = html.lastIndexOf('<script id="casa-details-reveal-engine-js">');
console.log(html.slice(lastScript + 2600));
