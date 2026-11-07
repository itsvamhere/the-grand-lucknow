import fs from 'node:fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
const fIdx = html.indexOf('<footer');
const fHtml = html.slice(fIdx);

const linkIdx = fHtml.indexOf('href="/venues.html"');
const endA = fHtml.indexOf('</a>', linkIdx);
console.log('RAW VENUES LINK HTML:');
console.log(fHtml.slice(linkIdx - 30, endA + 4));
