import fs from 'fs';

const content = fs.readFileSync('tools/generate_5_venue_subpages.mjs', 'utf8');

const regex = /buildSubpage\(idx\)[\s\S]*?return before \+ vlist \+ after;/;
const match = content.match(regex);
console.log('buildSubpage function snippet:\n', match ? match[0].slice(0, 800) : 'Not found');
