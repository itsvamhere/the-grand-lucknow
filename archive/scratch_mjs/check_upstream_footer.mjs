import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';

for (const f of fs.readdirSync(projectDir)) {
  if (f.startsWith('upstream_') && f.endsWith('.html')) {
    const content = fs.readFileSync(path.join(projectDir, f), 'utf8');
    const m = content.indexOf('svg870196829');
    if (m !== -1) {
      console.log(`Found in ${f}:`);
      console.log(content.substring(m - 100, m + 400));
      break;
    }
  }
}
