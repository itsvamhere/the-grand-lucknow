import fs from 'fs';

for (const f of fs.readdirSync('scripts')) {
  if (!f.endsWith('.mjs')) continue;
  const c = fs.readFileSync('scripts/' + f, 'utf8');
  if (c.includes('linkedin.com') || c.includes('LinkedIn') || c.includes('instagram.com')) {
    console.log('scripts/' + f);
    let idx = 0;
    while ((idx = c.indexOf('linkedin', idx)) !== -1) {
      console.log('  ' + c.substring(Math.max(0, idx - 40), Math.min(c.length, idx + 60)));
      idx += 8;
    }
  }
}
