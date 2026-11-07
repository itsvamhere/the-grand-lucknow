import fs from 'fs';
import path from 'path';

const projectDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';

function searchDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (ent.name !== 'node_modules' && ent.name !== '.git') searchDir(full);
    } else if (ent.name.endsWith('.mjs') || ent.name.endsWith('.html')) {
      const c = fs.readFileSync(full, 'utf-8');
      if (c.includes('Google Maps') || c.includes('maps.google') || c.includes('lat:') || c.includes('Map Cutout') || c.includes('Map')) {
        const matches = [...c.matchAll(/(.{0,40}(?:maps\.google|google\.com\/maps|lat:|lng:|Map|mapBox).{0,60})/g)];
        if (matches.length > 0) {
          console.log(`Found Map matches in: ${path.relative(projectDir, full)} (${matches.length})`);
          for (const m of matches.slice(0, 3)) {
            console.log('   ', m[0].replace(/\s+/g, ' '));
          }
        }
      }
    }
  }
}

searchDir(projectDir);
