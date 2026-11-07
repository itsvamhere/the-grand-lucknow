import fs from 'fs';
import path from 'path';

const projectDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';

function searchDir(dir, patterns) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.git') {
        searchDir(fullPath, patterns);
      }
    } else if (entry.isFile() && (entry.name.endsWith('.js') || entry.name.endsWith('.mjs') || entry.name.endsWith('.html') || entry.name.endsWith('.json'))) {
      const content = fs.readFileSync(fullPath, 'utf8');
      for (const [key, pat] of Object.entries(patterns)) {
        if (pat.test(content)) {
          console.log(`[${key}] in ${path.relative(projectDir, fullPath)}`);
        }
      }
    }
  }
}

const patterns = {
  'Boutique': /Boutique\s*N/i,
  'We believe': /I\s+believe/i,
  'temporary home': /temporary\s+home/i,
  'Our Vision': /My\s+Philosophy/i,
  'LinkedIn': /linkedin/i,
  'send us': /send\s+me/i,
  'stay?': /or\s+your\s+stay\?/i,
  'Details': /Apartment\s+Details/i,
  'Details': /Venue\s+Details/i,
  'Nexene': /Nexene/i,
  'Built by': /Made\s+with\s+love\s+by/i,
  'Graz': /Graz/i,
  'Moritz': /Moritz/i
};

searchDir(projectDir, patterns);
