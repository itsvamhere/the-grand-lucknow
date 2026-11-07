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
      if (c.includes('Nexene') || c.includes('nexene') || c.includes('Made with love') || c.includes('Built by')) {
        console.log(`Found attribution in: ${path.relative(projectDir, full)}`);
        const matches = [...c.matchAll(/(.{0,50}(?:Nexene|nexene|Made with love|Built by).{0,50})/g)];
        for (const m of matches.slice(0, 3)) {
          console.log('   ', m[0].replace(/\s+/g, ' '));
        }
      }
    }
  }
}

searchDir(projectDir);
