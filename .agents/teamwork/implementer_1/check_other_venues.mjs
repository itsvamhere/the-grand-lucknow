import fs from 'fs';
import path from 'path';

const dir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

for (const f of files) {
  const p = path.join(dir, f);
  const content = fs.readFileSync(p, 'utf8');
  const hasEngine = content.includes('grand-subpage-engine-js');
  const hasLetter = content.includes('grand-hero-letter');
  if (hasEngine || hasLetter) {
    console.log(f, { hasEngine, hasLetter });
  }
}
