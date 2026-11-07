import fs from 'fs';
import path from 'path';

function searchDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.git') {
        searchDir(fullPath);
      }
    } else if (entry.isFile() && (entry.name.endsWith('.js') || entry.name.endsWith('.mjs') || entry.name.endsWith('.html') || entry.name.endsWith('.css') || entry.name.endsWith('.svg'))) {
      try {
        const content = fs.readFileSync(fullPath, 'utf8');
        if (content.includes('112.277') || content.includes('2404.809')) {
          console.log(`Found in: ${fullPath}`);
        }
      } catch (e) {}
    }
  }
}

searchDir('.');
