import fs from 'node:fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

// Find the section containing "Location"
const locIdx = html.indexOf('data-framer-name="Location"');
// Let's see the section before it:
const sectionBefore = html.lastIndexOf('<section', locIdx);
console.log('Section markup before Location:');
console.log(html.slice(sectionBefore, locIdx));
