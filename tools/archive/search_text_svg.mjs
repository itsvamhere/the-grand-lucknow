import fs from 'fs';
import path from 'path';

function searchDir(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (f !== 'node_modules' && f !== '.git') searchDir(full);
    } else if (f.endsWith('.js') || f.endsWith('.mjs') || f.endsWith('.html') || f.endsWith('.css')) {
      const content = fs.readFileSync(full, 'utf8');
      if (content.includes('font-family="\'Lay Grotesk Regular\'"') || 
          content.includes('%27Lay%20Grotesk%20Regular%27') ||
          content.includes('font-family=\\\'Lay Grotesk Regular\\\'') ||
          (content.includes('THE GRAND') && content.includes('<text'))) {
        console.log('MATCH FOUND IN FILE:', full);
      }
    }
  }
}

searchDir('.');
