import fs from 'fs';

const v = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/venue-n2.html', 'utf8');

const matches = [...v.matchAll(/(Location|Address|Bindaua|Gomti|Raibareli|226301|Directions)/gi)];
for (const m of matches) {
  const s = Math.max(0, m.index - 50);
  const e = Math.min(v.length, m.index + m[0].length + 50);
  console.log(`[${m.index}] ${v.substring(s, e).replace(/\s+/g, ' ')}`);
}
