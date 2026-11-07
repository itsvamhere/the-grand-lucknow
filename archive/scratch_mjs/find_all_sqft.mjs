import fs from 'fs';
import path from 'path';

const root = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';

function search(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    if (f === 'node_modules') continue;
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      search(full);
    } else if (f.endsWith('.html') || f.endsWith('.mjs') || f.endsWith('.js')) {
      const c = fs.readFileSync(full, 'utf8');
      if (c.includes('sqft')) {
        console.log(`Found "sqft" in: ${full}`);
        const idx = c.indexOf('sqft');
        console.log('   ...', c.substring(Math.max(0, idx - 80), Math.min(c.length, idx + 80)).replace(/\s+/g, ' '), '...');
      }
    }
  }
}

search(root);
