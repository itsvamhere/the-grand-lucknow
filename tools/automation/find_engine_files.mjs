import fs from 'fs';
import path from 'path';

function findEngine(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      findEngine(full);
    } else if (f.endsWith('.html')) {
      const c = fs.readFileSync(full, 'utf8');
      if (c.includes('grand-subpage-engine-js')) {
        console.log('Has engine:', full);
      }
    }
  }
}

findEngine('venues');
findEngine('apartments');
