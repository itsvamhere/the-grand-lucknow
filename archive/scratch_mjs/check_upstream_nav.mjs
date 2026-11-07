import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';

// Check upstream files for ufowuZXjc
for (const f of fs.readdirSync(projectDir)) {
  if (f.startsWith('upstream_') && f.endsWith('.html')) {
    const html = fs.readFileSync(path.join(projectDir, f), 'utf8');
    const m = html.indexOf('ufowuZXjc');
    if (m !== -1) {
      console.log(`ufowuZXjc found in ${f}`);
      console.log(html.substring(m - 100, m + 400));
      break;
    }
  }
}
