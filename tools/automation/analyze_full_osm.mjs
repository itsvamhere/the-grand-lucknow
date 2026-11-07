import fs from 'node:fs';

const xml = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/lucknow_full_osm.xml', 'utf8');

const hwCounts = {};
const otherCounts = {};
const wayMatches = xml.split('</way>');
console.log('Total way chunks:', wayMatches.length);

for (const w of wayMatches) {
  const hw = w.match(/<tag k="highway" v="([^"]+)"/);
  if (hw) {
    hwCounts[hw[1]] = (hwCounts[hw[1]] || 0) + 1;
  }
  const other = w.match(/<tag k="(waterway|natural|landuse|railway|building)" v="([^"]+)"/);
  if (other) {
    const k = other[1] + '=' + other[2];
    otherCounts[k] = (otherCounts[k] || 0) + 1;
  }
}
console.log('Highways:', hwCounts);
console.log('Top other features:', Object.entries(otherCounts).sort((a,b)=>b[1]-a[1]).slice(0, 20));
