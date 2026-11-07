import fs from 'fs';
const html = fs.readFileSync('index.html', 'utf8');

const fStart = html.indexOf('<footer');
const fEnd = html.indexOf('</footer>', fStart) + 9;
const fChunk = html.slice(fStart, fEnd);

// Let's find any text or headings in the footer
console.log('Words in footer:', fChunk.match(/THE GRAND|AND|THE GR|Instagram|Facebook|Contact|Menu|Socials/g));

// Let's find any subcontainers in the footer
const containers = fChunk.match(/data-framer-name="[^"]+"/g);
console.log('Framer names in footer:', containers);
