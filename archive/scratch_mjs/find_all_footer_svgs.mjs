import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';

for (const f of fs.readdirSync(projectDir)) {
  if (f.endsWith('.html')) {
    const html = fs.readFileSync(path.join(projectDir, f), 'utf8');
    if (html.includes('svg870196829')) {
      console.log(`Found svg870196829 in ${f}`);
    }
  }
}
