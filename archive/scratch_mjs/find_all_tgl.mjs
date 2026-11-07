import fs from 'fs';
import path from 'path';

const projectDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';

function searchDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (ent.name !== 'node_modules' && ent.name !== '.git') searchDir(full);
    } else if (ent.name.endsWith('.mjs') || ent.name.endsWith('.html') || ent.name.endsWith('.svg')) {
      const c = fs.readFileSync(full, 'utf-8');
      if (c.includes('THE GRAND LUCKNOW') || c.includes('THE%20GRAND%20LUCKNOW') || c.includes('The Grand Lucknow')) {
        console.log(`Found in: ${path.relative(projectDir, full)}`);
      }
    }
  }
}

searchDir(projectDir);
