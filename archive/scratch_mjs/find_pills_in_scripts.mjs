import fs from 'fs';
import path from 'path';

const projectDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';
const scripts = fs.readdirSync(path.join(projectDir, 'scripts')).filter(f => f.endsWith('.mjs'));

for (const s of scripts) {
  const c = fs.readFileSync(path.join(projectDir, 'scripts', s), 'utf-8');
  // Check for the classes or styles or text
  if (c.includes('Venue N°') || c.includes('Boutique') || c.includes('Ballroom')) {
    const lines = c.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('Grand Ballroom') || lines[i].includes('Boutique N°') || lines[i].includes('Venue N°')) {
        console.log(`[${s}:${i+1}]`);
        const sub = lines[i].match(/.{0,80}(?:Grand Ballroom|Boutique N°|Venue N°).{0,80}/g);
        if (sub) {
          for (const item of sub.slice(0, 3)) {
            console.log('   ', item);
          }
        }
      }
    }
  }
}
