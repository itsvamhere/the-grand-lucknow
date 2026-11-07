import fs from 'node:fs';

const data = JSON.parse(fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/parsed_wide_ways.json', 'utf8'));
console.log('Keys:', Object.keys(data));
if (Array.isArray(data)) {
  console.log('Array length:', data.length);
} else {
  for (const k of Object.keys(data)) {
    console.log(k, Array.isArray(data[k]) ? data[k].length : typeof data[k]);
  }
}
