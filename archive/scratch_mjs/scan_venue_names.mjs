import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';

function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const results = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.git') {
        results.push(...scanDir(fullPath));
      }
    } else if (/\.(mjs|js|html)$/.test(entry.name)) {
      results.push(fullPath);
    }
  }
  return results;
}

const files = scanDir(projectDir);
const venueNames = [
  'Venue N°1',
  'Venue N°2',
  'Venue N°3',
  'Venue N°4',
  'Venue N°5',
  'Venue N°6',
  'Venue N°7',
  'Venue N°8',
  'Venue N°9'
];

for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const matched = venueNames.filter(n => content.includes(n));
  if (matched.length > 0) {
    console.log(`${path.relative(projectDir, f)}: ${matched.join(', ')}`);
  }
}
