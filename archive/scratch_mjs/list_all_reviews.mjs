import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const content = fs.readFileSync(path.join(projectDir, 'scripts', 'fr7SG9GQkh-Q7q0KIf8wgobOAuPxVSUAvz16mel55Cw.DZ6IOu8F.mjs'), 'utf8');

// Find all review cards
const regex = /j0DM_httP:`([^`]+)`,layoutId:[^,]+,MJoOlQckD:`([^`]+)`/g;
let m;
let count = 0;
while ((m = regex.exec(content)) !== null) {
  count++;
  console.log(`Review ${count}: Author = ${m[1]}`);
  console.log(`  Quote: ${m[2]}\n`);
}
