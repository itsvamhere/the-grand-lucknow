import fs from 'fs';

const content = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf8');

function inspectSection(id) {
  const start = content.indexOf(`id="${id}"`);
  if (start === -1) {
    console.log(`id="${id}" not found`);
    return;
  }
  const sectionStart = content.lastIndexOf('<section', start);
  const sectionEnd = content.indexOf('</section>', start);
  console.log(`=== SECTION ${id} === (length: ${sectionEnd - sectionStart})`);
  const slice = content.substring(sectionStart, sectionEnd + 10);
  fs.writeFileSync(`C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/tools/dump_${id}.html`, slice);
  console.log(`Dumped to tools/dump_${id}.html`);
}

inspectSection('locations');
inspectSection('locations-1');

// Search for map elements or scripts in index.html
const mapMatches = content.match(/<[^>]+(?:map|Mapbox|maplibre|Raibareli|Graz|Sackstraße)[^>]*>/gi);
console.log('Map-related tags:', mapMatches ? mapMatches.slice(0, 10) : 'none');
