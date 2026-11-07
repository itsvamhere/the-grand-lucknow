import fs from 'fs';

const content = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/kUR3CfpW9NIyRzidNwuOKmKl470PoGVqflldEj15ME4.Sg5Y4YBO.mjs', 'utf-8');

// Find text props
const textMatches = [...content.matchAll(/text:`([^`]+)`/g)];
console.log(`Found ${textMatches.length} text properties in kUR:`);
for (const t of textMatches) {
  console.log('->', t[1].replace(/\n/g, ' '));
}
