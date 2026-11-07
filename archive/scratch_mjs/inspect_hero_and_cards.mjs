import fs from 'fs';
import path from 'path';

const projectDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';

const html = fs.readFileSync(path.join(projectDir, 'index.html'), 'utf-8');

// Check hero text occurrences in index.html
console.log('--- Hero checks in index.html ---');
const heroMatches = [...html.matchAll(/(.{0,50}(?:THE GRAND|LUCKNOW|Grand Ballroom|Details|45 m|45 sqft|Boutique|We believe|head and heart).{0,50})/gi)];
console.log(`Found ${heroMatches.length} matches in index.html:`);
for (const m of heroMatches.slice(0, 15)) {
  console.log('  ->', m[0].replace(/\s+/g, ' '));
}

// Check scripts for "Grand Ballroom Grand Ballroom" or double names
console.log('\n--- Double pill check in scripts ---');
const scripts = fs.readdirSync(path.join(projectDir, 'scripts')).filter(f => f.endsWith('.mjs'));
for (const s of scripts) {
  const content = fs.readFileSync(path.join(projectDir, 'scripts', s), 'utf-8');
  if (content.includes('Grand Ballroom')) {
    console.log(`Found "Grand Ballroom" in ${s}`);
    const matches = [...content.matchAll(/(.{0,40}Grand Ballroom.{0,40})/g)];
    for (const m of matches.slice(0, 5)) {
      console.log('    ', m[0]);
    }
  }
}
