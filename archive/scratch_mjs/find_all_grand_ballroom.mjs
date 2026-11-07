import fs from 'fs';
import path from 'path';

const projectDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';

function searchDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (ent.name !== 'node_modules' && ent.name !== '.git') {
        searchDir(full);
      }
    } else if (ent.name.endsWith('.mjs') || ent.name.endsWith('.html') || ent.name.endsWith('.js') || ent.name.endsWith('.json')) {
      const c = fs.readFileSync(full, 'utf-8');
      if (c.includes('Grand Ballroom')) {
        console.log(`Found in: ${path.relative(projectDir, full)}`);
        const matches = [...c.matchAll(/(.{0,60}Grand Ballroom.{0,60})/g)];
        for (const m of matches.slice(0, 5)) {
          console.log('   ', m[0].replace(/\s+/g, ' '));
        }
      }
    }
  }
}

searchDir(projectDir);
