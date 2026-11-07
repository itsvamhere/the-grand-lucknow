import fs from 'fs';
import path from 'path';

const ROOT = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const parityScript = fs.readFileSync(path.join(ROOT, 'tools', 'apply_perfect_parity.mjs'), 'utf8');

const lines = parityScript.split('\n');
lines.forEach((l, i) => {
  if (l.includes('ticker') || l.includes('Footer Logo') || l.includes('framer-xj8hz2')) {
    console.log(`L${i + 1}: ${l.slice(0, 140)}`);
  }
});
