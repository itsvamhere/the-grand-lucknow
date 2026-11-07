import fs from 'fs';
import path from 'path';

const ROOT = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const lawnHtml = fs.readFileSync(path.join(ROOT, 'venues', 'open-earth-lawn.html'), 'utf8');

const matches = lawnHtml.match(/https:\/\/framerusercontent\.com\/sites\/1bk9uGIcxVnDnwzQnwlcko\/([^\"]+)/g) || [];
const files = matches.map(m => m.split('/').pop());

const missing = [];
for (const file of files) {
  const localPath = path.join(ROOT, 'scripts', file);
  if (!fs.existsSync(localPath)) {
    missing.push(file);
  }
}

console.log('Total referenced files:', files.length);
console.log('Missing in scripts/:', missing);
