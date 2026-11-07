import fs from 'fs';

function findCopy(file) {
  console.log(`=== ${file} ===`);
  const content = fs.readFileSync(file, 'utf8');
  const matches = [...content.matchAll(/(send us|give us|your stay|call at|Feel free)/gi)];
  for (const m of matches) {
    const s = Math.max(0, m.index - 50);
    const e = Math.min(content.length, m.index + m[0].length + 50);
    console.log(`[${m.index}] ${content.substring(s, e).replace(/\s+/g, ' ')}`);
  }
}

findCopy('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/venue-n2.html');
