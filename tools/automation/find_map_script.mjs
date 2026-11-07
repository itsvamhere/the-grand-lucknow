import fs from 'node:fs';

const files = fs.readdirSync('scripts').filter(f => f.endsWith('.mjs'));

for (const f of files) {
  const content = fs.readFileSync('scripts/' + f, 'utf8');
  if (content.includes('Location Map') || content.includes('casa-map-chip') || content.includes('casa-map-pulse')) {
    console.log('Script with map logic:', f);
  }
}
