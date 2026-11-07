import fs from 'fs';

const content = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/fr7SG9GQkh-Q7q0KIf8wgobOAuPxVSUAvz16mel55Cw.DZ6IOu8F.mjs', 'utf-8');

// Find reviews text
const matches = [...content.matchAll(/MJoOlQckD:`([^`]+)`/g)];
console.log(`Reviews in fr7: ${matches.length}`);
for (const m of matches) {
  console.log('--- Review ---');
  console.log(m[1]);
}

const authors = [...content.matchAll(/j0DM_httP:`([^`]+)`/g)];
console.log(`Authors: ${authors.length}`);
for (const a of authors) {
  console.log('Author:', a[1]);
}
