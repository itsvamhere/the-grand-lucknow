import fs from 'fs';
import path from 'path';

const dir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';

// Check index.html and scripts
const files = ['index.html', ...fs.readdirSync(path.join(dir, 'scripts')).filter(f => f.endsWith('.mjs')).map(f => 'scripts/' + f)];

for (const file of files) {
  const content = fs.readFileSync(path.join(dir, file), 'utf-8');
  const matches = [...content.matchAll(/([^\n\r"']{0,60}LUCKNOW[^\n\r"']{0,60})/g)];
  if (matches.length > 0) {
    console.log(`\n=== ${file} (${matches.length}) ===`);
    for (const m of matches.slice(0, 5)) {
      console.log(' ', m[1]);
    }
  }
}
