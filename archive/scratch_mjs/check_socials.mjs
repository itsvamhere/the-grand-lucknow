import fs from 'fs';

function findSocials(file) {
  console.log(`=== ${file} ===`);
  const content = fs.readFileSync(file, 'utf8');
  const matches = [...content.matchAll(/(LinkedIn|Facebook|Instagram|moritz-steinlechner|Nexene|Made with love|send us|give us|stay\?)/gi)];
  for (const m of matches) {
    const s = Math.max(0, m.index - 40);
    const e = Math.min(content.length, m.index + m[0].length + 40);
    console.log(`[${m.index}] ${content.substring(s, e).replace(/\s+/g, ' ')}`);
  }
}

findSocials('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html');
findSocials('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/venue-n2.html');
