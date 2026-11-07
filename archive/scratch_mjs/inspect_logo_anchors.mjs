import fs from 'fs';

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf8');

const matches = [...html.matchAll(/<a[^>]*data-framer-name="Logo"[^>]*>[\s\S]{0,500}?<\/a>/g)];
matches.forEach((m, i) => {
  console.log(`[${i}] ${m[0]}`);
});
