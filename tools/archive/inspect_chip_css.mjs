import fs from 'fs';

const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const chipIdx = subHtml.indexOf('.casa-map-chip');
console.log('.casa-map-chip index:', chipIdx);
if (chipIdx !== -1) {
  console.log('Snippet of .casa-map-chip CSS:\n', subHtml.slice(chipIdx, chipIdx + 800));
}
