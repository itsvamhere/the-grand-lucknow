import fs from 'fs';
const c = fs.readFileSync('scripts/AOQA9ZjYa.CwSXFmg7.mjs', 'utf8');

// search for space-0 or n1 or N°
const matches = [...c.matchAll(/(space-0[0-9]|venue-n[0-9]|boutique-n[0-9]|N°0[0-9]|N°[0-9])/gi)];
for (const m of matches.slice(0, 15)) {
  console.log(m[0] + ' at ' + m.index);
}

// search for slug-like strings
const slugs = [...c.matchAll(/Xm83njC6M:[`'"]([^`'"]+)[`'"]/g)];
console.log('Slugs found:');
for (const s of slugs) {
  console.log('  ' + s[1]);
}
