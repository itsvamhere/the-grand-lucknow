import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const html = fs.readFileSync(path.join(projectDir, 'index.html'), 'utf8');

const matches = [...html.matchAll(/<(section|div)[^>]+data-framer-name=["']([^"']+)["'][^>]*>/gi)];
console.log('Sections/Containers found:', matches.length);
matches.forEach((m, i) => {
  const tag = m[1];
  const name = m[2];
  if (['Hero', 'Apartments', 'Venues', 'Story', 'Location', 'Reviews', 'Footer', 'Navbar'].some(k => name.toLowerCase().includes(k.toLowerCase()))) {
    console.log(`[${i}] <${tag} name="${name}">`);
  }
});
