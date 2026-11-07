import fs from 'fs';
import path from 'path';

const projectDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';

const files = fs.readdirSync(path.join(projectDir, 'scripts')).filter(f => f.endsWith('.mjs'));
for (const file of files) {
  const content = fs.readFileSync(path.join(projectDir, 'scripts', file), 'utf-8');
  if (content.includes('Chair') || content.includes('Sofa') || content.includes('Desk') || content.includes('Lamp')) {
    const matches = [...content.matchAll(/(.{0,40}(?:Chair|Sofa|Desk|Lamp).{0,40})/g)];
    if (matches.length > 0) {
      console.log(`Found furniture matches in ${file}:`);
      for (const m of matches.slice(0, 3)) {
        console.log('  ', m[0]);
      }
    }
  }
}
