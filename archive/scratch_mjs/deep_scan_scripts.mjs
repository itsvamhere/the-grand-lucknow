import fs from 'fs';
import path from 'path';

const projectDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';

const targets = {
  'Boutique': /boutique/i,
  'Details': /apartment\s*details/i,
  'Details': /venue\s*details/i,
  'LinkedIn': /linkedin/i,
  'send us': /send\s*me/i,
  'give us': /give\s*me/i,
  'stay?': /stay\?/i,
  'Our Vision': /my\s*philosophy/i,
  'We believe': /i\s*believe/i,
  'temporary home': /temporary\s*home/i,
  'as your own home': /as\s*your\s*own\s*home/i,
  'Built by': /made\s*with\s*love\s*by/i,
  'Nexene': /nexene/i
};

console.log('--- SCANNING ALL .mjs FILES IN scripts/ ---');
const scriptsDir = path.join(projectDir, 'scripts');
for (const file of fs.readdirSync(scriptsDir)) {
  if (!file.endsWith('.mjs') && !file.endsWith('.js')) continue;
  const filePath = path.join(scriptsDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  for (const [name, regex] of Object.entries(targets)) {
    if (regex.test(content)) {
      console.log(`[${name}] found in scripts/${file}`);
    }
  }
}
