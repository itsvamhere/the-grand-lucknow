import fs from 'fs';
const c = fs.readFileSync('scripts/fr7SG9GQkh-Q7q0KIf8wgobOAuPxVSUAvz16mel55Cw.DZ6IOu8F.mjs', 'utf8');

// find where at is defined in fr7
const idx = c.indexOf('at=');
console.log('at definition at ' + idx);
console.log(c.substring(Math.max(0, idx - 40), Math.min(c.length, idx + 200)));
