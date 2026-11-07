import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const html = fs.readFileSync(path.join(projectDir, 'index.html'), 'utf8');

// Search for classes of hero text
const heroClasses = ['framer-127143z', 'framer-text'];
heroClasses.forEach(cls => {
  const re = new RegExp(`\\.${cls}[^\\{]*\\{[^\\}]+\\}`, 'g');
  const matches = [...html.matchAll(re)];
  console.log(`\nMatches for .${cls}:`, matches.length);
  matches.slice(0, 5).forEach(m => console.log(m[0]));
});
