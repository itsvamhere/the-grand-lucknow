import fs from 'fs';

const idx = fs.readFileSync('index.html', 'utf8');
const idxFooterStart = idx.indexOf('<footer');
const idxFooterEnd = idx.indexOf('</footer>') + 9;
const idxFooter = idx.slice(idxFooterStart, idxFooterEnd);

// Check all href="#..." inside idxFooter
const hrefs = [...idxFooter.matchAll(/href="#([^"]+)"/g)].map(m => m[1]);
const uniqueHrefs = Array.from(new Set(hrefs));
console.log('SVG href IDs used in index footer:', uniqueHrefs);

for (const id of uniqueHrefs) {
  const inFooter = idxFooter.includes(`id="${id}"`);
  const inDoc = idx.includes(`id="${id}"`);
  console.log(`ID ${id}: inFooter=${inFooter}, inDoc=${inDoc}`);
  if (!inFooter && inDoc) {
    // Find where it is defined in idx
    const defIndex = idx.indexOf(`id="${id}"`);
    console.log(`Definition context:`, idx.slice(Math.max(0, defIndex - 100), Math.min(idx.length, defIndex + 200)));
  }
}
