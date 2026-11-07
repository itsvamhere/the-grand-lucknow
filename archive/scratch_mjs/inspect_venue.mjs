import fs from 'fs';

const content = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/venue-n2.html', 'utf8');

const patterns = [/Boutique/gi, /Apartment/gi, /Casa Momo/gi, /Graz/gi, /Moritz/gi, /sq ft/gi];
for (const re of patterns) {
  let match;
  console.log(`=== Matches for ${re} ===`);
  let count = 0;
  while ((match = re.exec(content)) !== null && count < 10) {
    count++;
    const start = Math.max(0, match.index - 40);
    const end = Math.min(content.length, match.index + match[0].length + 40);
    console.log(`[${match.index}] ...${content.substring(start, end).replace(/\s+/g, ' ')}...`);
  }
}
