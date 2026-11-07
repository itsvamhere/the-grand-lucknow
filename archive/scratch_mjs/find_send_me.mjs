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
      if (/send\s+me/i.test(content) || /feel\s+free/i.test(content)) {
        console.log(`Found match in: ${full}`);
        const m = content.match(/.{0,80}(?:send\s+me|feel\s+free).{0,80}/gi);
        console.log(m ? m.slice(0, 3) : []);
      }
    }
  }
}

searchDir(root);
