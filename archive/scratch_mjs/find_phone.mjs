import fs from 'fs';
import path from 'path';

const root = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';

function searchDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules') continue;
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      searchDir(full);
    } else if (file.endsWith('.html') || file.endsWith('.mjs') || file.endsWith('.js')) {
      const content = fs.readFileSync(full, 'utf8');
      if (content.includes('91291')) {
        console.log(`91291 in: ${full}`);
        const idx = content.indexOf('91291');
        console.log(content.substring(Math.max(0, idx - 100), Math.min(content.length, idx + 100)).replace(/\s+/g, ' '));
      }
    }
  }
}

searchDir(root);
