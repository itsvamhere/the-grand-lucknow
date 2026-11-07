import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';

// Search all files in scripts/ for svg870196829 or 1202.351 or 2404.809
const scriptsDir = path.join(projectDir, 'scripts');
for (const f of fs.readdirSync(scriptsDir)) {
  const content = fs.readFileSync(path.join(scriptsDir, f), 'utf8');
  if (content.includes('1202.351') || content.includes('2404.809') || content.includes('svg870196829')) {
    console.log(`Found in script: ${f}`);
    const matches = [...content.matchAll(/(.{0,100}(?:1202\.351|2404\.809|svg870196829).{0,100})/g)];
    matches.forEach(m => console.log('   ', m[0]));
  }
}
