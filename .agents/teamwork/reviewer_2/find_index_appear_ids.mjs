import fs from 'fs';
const s = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf8');
const headerMatches = [...s.matchAll(/<header[\s\S]*?<\/header>/g)];
headerMatches.forEach((h, i) => {
  const appearMatches = [...h[0].matchAll(/data-framer-appear-id="([^"]*)"/g)];
  console.log('Index Header', i, 'appear IDs:', appearMatches.map(m => m[1]));
});
