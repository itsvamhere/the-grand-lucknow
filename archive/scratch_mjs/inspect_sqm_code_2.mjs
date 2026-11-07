import fs from 'fs';

const content = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/T5PVEAy5F.D5-RUb5a.mjs', 'utf-8');

const idx = content.indexOf('VedUqiOcC');
if (idx !== -1) {
  console.log(content.slice(idx, idx + 800));
}
