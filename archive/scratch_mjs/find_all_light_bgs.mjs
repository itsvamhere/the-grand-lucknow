import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';

function searchBgs(dir) {
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    const s = fs.statSync(full);
    if (s.isDirectory()) {
      if (item !== 'node_modules' && item !== '.git' && item !== '.vercel') {
        searchBgs(full);
      }
    } else if (item.endsWith('.html')) {
      const content = fs.readFileSync(full, 'utf8');
      const matches = content.match(/background(?:-color)?:\s*[^;\}]+/gi) || [];
      const lightBgs = matches.filter(m => m.includes('243, 236, 221') || m.includes('F3ECDD') || m.includes('FFF1C9') || m.includes('255, 241, 201') || m.includes('248, 235, 201'));
      if (lightBgs.length > 0) {
        console.log(`${path.relative(projectDir, full)} has ${lightBgs.length} light backgrounds:`, lightBgs.slice(0, 3));
      }
    }
  }
}

searchBgs(projectDir);
