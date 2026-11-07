import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const html = fs.readFileSync(path.join(projectDir, 'index.html'), 'utf8');

// Find occurrences of "EL PACRE"
const elPacreOccurrences = [...html.matchAll(/.{0,100}EL PACRE.{0,100}/gi)];
console.log('EL PACRE occurrences in index.html:', elPacreOccurrences.length);
elPacreOccurrences.slice(0, 10).forEach((m, i) => console.log(`[${i}]`, m[0].replace(/\s+/g, ' ')));

// Check scripts directory for EL PACRE and hero text
const scriptsDir = path.join(projectDir, 'scripts');
const scriptFiles = fs.readdirSync(scriptsDir);
for (const file of scriptFiles) {
  if (file.endsWith('.js') || file.endsWith('.mjs')) {
    const content = fs.readFileSync(path.join(scriptsDir, file), 'utf8');
    if (content.includes('EL PACRE') || content.includes('el-pacre') || content.includes('borEE9veyD0zs6Cs5ThKJI0LcKU')) {
      console.log(`File ${file} has EL PACRE!`);
      const matches = [...content.matchAll(/.{0,120}EL PACRE.{0,120}/gi)];
      matches.slice(0, 5).forEach((m, i) => console.log(`  [${i}]`, m[0].replace(/\s+/g, ' ')));
    }
  }
}
