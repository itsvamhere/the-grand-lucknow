import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const html = fs.readFileSync(path.join(projectDir, 'index.html'), 'utf8');

const navIdx = html.indexOf('ufowuZXjc');
console.log('ufowuZXjc in index.html:', navIdx);
if (navIdx !== -1) {
  console.log(html.substring(navIdx - 100, navIdx + 500));
}

// Search for any other occurrences of 'THE GRAND' in index.html
const matches = [...html.matchAll(/(.{0,100}THE GRAND.{0,100})/g)];
console.log('\n--- All THE GRAND in index.html --- (total ' + matches.length + ')');
matches.forEach((m, i) => console.log(`[${i}]`, m[0].replace(/\s+/g, ' ')));
