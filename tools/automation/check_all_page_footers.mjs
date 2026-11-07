import fs from 'node:fs';
import path from 'node:path';

const root = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';

const candidateFiles = [
  'venues/open-earth-lawn.html',
  'venues/venue-n1.html',
  'venues/venue-n2.html',
  'venues/venue-n3.html',
  'venues/venue-n4.html',
  'venues/venue-n5.html',
  'venues/boutique-n1.html',
  'venues/boutique-n2.html',
  'venues/boutique-n3.html',
  'venues/boutique-n4.html',
  'venues/boutique-n5.html',
  'venues/loft-n1.html',
  'apartments/boutique-n1.html',
  'apartments/boutique-n2.html',
  'apartments/boutique-n3.html',
  'apartments/boutique-n4.html',
  'apartments/boutique-n5.html',
  'apartments/loft-n1.html',
  'venues.html',
  'about.html',
  'contact.html',
  'imprint.html',
  'terms.html',
  'privacy.html'
];

const report = [];
for (const rel of candidateFiles) {
  const full = path.join(root, rel);
  if (fs.existsSync(full)) {
    const content = fs.readFileSync(full, 'utf8');
    const fIdx = content.indexOf('<footer');
    const fEnd = content.indexOf('</footer>', fIdx);
    report.push({
      file: rel,
      hasFooter: fIdx !== -1,
      footerClass: fIdx !== -1 ? (content.slice(fIdx, fIdx + 100).match(/class="([^"]+)"/) || [])[1] : null
    });
  } else {
    report.push({ file: rel, exists: false });
  }
}

console.log(JSON.stringify(report, null, 2));
