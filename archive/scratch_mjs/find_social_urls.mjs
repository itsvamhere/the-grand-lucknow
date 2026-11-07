import fs from 'fs';
import path from 'path';

const projectDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';

// Check which script has the Instagram and LinkedIn links
const files = fs.readdirSync(path.join(projectDir, 'scripts')).filter(f => f.endsWith('.mjs'));
for (const file of files) {
  const content = fs.readFileSync(path.join(projectDir, 'scripts', file), 'utf-8');
  if (content.includes('instagram.com') || content.includes('linkedin.com')) {
    console.log(`File with social URL: ${file}`);
    const matches = [...content.matchAll(/https:\/\/(?:www\.)?(?:instagram|linkedin)\.com[^\s"'`]+/g)];
    for (const m of matches) {
      console.log('   URL:', m[0]);
    }
  }
}
