import fs from 'fs';
import path from 'path';

const projectDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';

const files = ['index.html', ...fs.readdirSync(path.join(projectDir, 'scripts')).filter(f => f.endsWith('.mjs')).map(f => 'scripts/' + f)];
for (const file of files) {
  const content = fs.readFileSync(path.join(projectDir, file), 'utf-8');
  if (content.includes('data-cursor') || content.includes('Details') || content.includes('Details')) {
    console.log(`Found cursor/details in: ${file}`);
    const matches = [...content.matchAll(/(.{0,50}(?:data-cursor|Details|Details).{0,50})/g)];
    for (const m of matches.slice(0, 5)) {
      console.log('   ', m[0].replace(/\s+/g, ' '));
    }
  }
}
