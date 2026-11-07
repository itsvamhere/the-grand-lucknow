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
      if (c.includes('Boutique N°') || c.includes('Boutique N&#176;') || c.includes('Boutique N\u00B0')) {
        console.log(`Found in: ${path.relative(projectDir, full)}`);
      }
    }
  }
}

searchDir(projectDir);
