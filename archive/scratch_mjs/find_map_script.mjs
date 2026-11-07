import fs from 'fs';
import path from 'path';

const scriptsDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts';
const files = fs.readdirSync(scriptsDir);

for (const file of files) {
  if (!file.endsWith('.js') && !file.endsWith('.mjs')) continue;
  const content = fs.readFileSync(path.join(scriptsDir, file), 'utf8');
  if (content.includes('casa-map-chip') || content.includes('Map showing the apartment')) {
    console.log(`Found map component in: ${file}`);
  }
}
