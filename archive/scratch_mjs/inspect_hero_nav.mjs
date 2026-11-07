import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const html = fs.readFileSync(path.join(projectDir, 'index.html'), 'utf8');

// Find the hero split text elements in index.html
const matches = [...html.matchAll(/<p[^>]+style="[^"]*EL PACRE[^"]*"[^>]*>[\s\S]*?<\/p>/gi)];
matches.forEach((m, i) => {
  console.log(`\n=== Match ${i} ===`);
  console.log(m[0]);
});

// Also check the navbar logo in index.html
console.log('\n=== Navbar Logo in index.html ===');
const navMatches = [...html.matchAll(/(.{0,150}(?:logo-dark|logo-light|THE GRAND|framer-nav|framer-header).{0,150})/gi)];
navMatches.slice(0, 10).forEach((m, i) => {
  console.log(`[Nav ${i}]`, m[0].replace(/\s+/g, ' '));
});
