import fs from 'fs';
import path from 'path';

const ROOT = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';

function checkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (f !== 'node_modules' && f !== '.git' && f !== 'archive') checkDir(full);
    } else if (f.endsWith('.html')) {
      const content = fs.readFileSync(full, 'utf8');
      if (content.includes('https://framerusercontent.com/sites/1bk9uGIcxVnDnwzQnwlcko/')) {
        console.log('File has upstream framer CDN link:', path.relative(ROOT, full));
      }
    }
  }
}

checkDir(ROOT);
