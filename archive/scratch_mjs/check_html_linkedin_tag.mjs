import fs from 'fs';
import path from 'path';

const projectDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';
const html = fs.readFileSync(path.join(projectDir, 'index.html'), 'utf-8');

const idx = html.indexOf('linkedin.com');
if (idx !== -1) {
  console.log(html.slice(idx - 100, idx + 1200));
}
