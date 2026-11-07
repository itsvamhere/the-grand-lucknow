import fs from 'fs';
import path from 'path';

const scriptsDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts';
const files = fs.readdirSync(scriptsDir);

for (const f of files) {
  if (!f.endsWith('.mjs') && !f.endsWith('.js')) continue;
  const content = fs.readFileSync(path.join(scriptsDir, f), 'utf8');
  if (content.includes('T5PVEAy5F')) {
    console.log(`Imported in: ${f}`);
  }
}
