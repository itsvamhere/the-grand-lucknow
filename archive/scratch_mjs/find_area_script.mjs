import fs from 'fs';
import path from 'path';

const scriptsDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts';
const files = fs.readdirSync(scriptsDir);

for (const file of files) {
  if (!file.endsWith('.mjs') && !file.endsWith('.js')) continue;
  const content = fs.readFileSync(path.join(scriptsDir, file), 'utf8');
  if (content.includes('sqft') || content.includes('sq ft') || content.includes('sq ft') || content.includes('m2')) {
    console.log(`Found area units in: ${file}`);
  }
}
