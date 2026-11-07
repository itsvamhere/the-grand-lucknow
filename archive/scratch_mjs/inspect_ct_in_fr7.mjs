import fs from 'fs';
const c = fs.readFileSync('scripts/fr7SG9GQkh-Q7q0KIf8wgobOAuPxVSUAvz16mel55Cw.DZ6IOu8F.mjs', 'utf8');

const idx = c.indexOf('Ct=');
console.log(c.substring(idx - 20, idx + 200));
