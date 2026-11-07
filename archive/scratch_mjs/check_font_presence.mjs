import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';

function checkFont(dir) {
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (item !== 'node_modules' && item !== '.git' && item !== '.vercel') {
        checkFont(full);
      }
    } else if (item.endsWith('.html')) {
      const html = fs.readFileSync(full, 'utf8');
      const hasElPacre = html.includes('EL PACRE Regular');
      if (!hasElPacre) {
        console.log(`Missing EL PACRE Regular in: ${path.relative(projectDir, full)}`);
      }
    }
  }
}

checkFont(projectDir);
console.log('Font check complete.');
