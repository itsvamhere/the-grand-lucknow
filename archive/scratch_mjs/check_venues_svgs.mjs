import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';

['venues', 'apartments'].forEach(dir => {
  const dirPath = path.join(projectDir, dir);
  if (fs.existsSync(dirPath)) {
    for (const f of fs.readdirSync(dirPath)) {
      if (f.endsWith('.html')) {
        const html = fs.readFileSync(path.join(dirPath, f), 'utf8');
        const hasFoot = html.includes('svg870196829');
        const hasNav = html.includes('svg-1334768056');
        if (hasFoot || hasNav) {
          console.log(`${dir}/${f}: foot=${hasFoot}, nav=${hasNav}`);
        }
      }
    }
  }
});
