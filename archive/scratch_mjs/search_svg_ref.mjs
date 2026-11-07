import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';

function searchInDir(dir) {
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (item !== 'node_modules' && item !== '.git' && item !== '.vercel') {
        searchInDir(full);
      }
    } else if (item.endsWith('.html') || item.endsWith('.mjs') || item.endsWith('.js')) {
      const content = fs.readFileSync(full, 'utf8');
      if (content.includes('-1334768056') || content.includes('1334768056')) {
        console.log(`Found in: ${path.relative(projectDir, full)}`);
      }
    }
  }
}

searchInDir(projectDir);
