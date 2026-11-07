import fs from 'node:fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const lastScript = html.lastIndexOf('<script');
console.log(html.slice(lastScript, lastScript + 1200));
