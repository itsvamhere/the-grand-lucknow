import fs from 'fs';

const content = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/T5PVEAy5F.D5-RUb5a.mjs', 'utf-8');

// Find references to squaremeter, m2, sqft, size, guest count
const matches = [...content.matchAll(/(.{0,80}(?:sq ft|Squaremeter|sqft|Guests|PFZZ97FrQ|RwQ9LnKAg|MW1ol9EEJ).{0,80})/gi)];
console.log(`Matches in T5PVEAy5F: ${matches.length}`);
for (const m of matches.slice(0, 10)) {
  console.log('->', m[0]);
}
