import fs from 'fs';

const content = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/MWiDeq9TQ.B91DGIYZ.mjs', 'utf8');

let match;
const re = /linkedin/gi;
while ((match = re.exec(content)) !== null) {
  const start = Math.max(0, match.index - 80);
  const end = Math.min(content.length, match.index + 80);
  console.log(`[${match.index}] ${content.substring(start, end)}`);
}
