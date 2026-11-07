import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const imagesDir = path.join(projectDir, 'images');

['wordmark.svg', 'logo-dark.svg', 'logo-light.svg'].forEach(name => {
  const p = path.join(imagesDir, name);
  if (fs.existsSync(p)) {
    console.log(`\n=== ${name} ===`);
    console.log(fs.readFileSync(p, 'utf8'));
  } else {
    console.log(`\n=== ${name} NOT FOUND ===`);
  }
});
