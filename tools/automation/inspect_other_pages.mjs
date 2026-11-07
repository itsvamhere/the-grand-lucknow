import fs from 'node:fs';
import path from 'node:path';

const root = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';

const pages = ['venues.html', 'about.html', 'contact.html', 'imprint.html', 'terms.html', 'privacy.html'];

for (const p of pages) {
  const full = path.join(root, p);
  const content = fs.readFileSync(full, 'utf8');
  const fIdx = content.indexOf('<footer');
  const fEnd = content.indexOf('</footer>', fIdx) + 9;
  const footerSlice = content.slice(fIdx, fEnd);
  console.log(`Page: ${p}, footer length: ${footerSlice.length}`);
  const hasZeroOpacity = /opacity:\s*0[;\s"]/g.test(footerSlice);
  console.log(`Page: ${p}, hasZeroOpacity: ${hasZeroOpacity}`);
}
