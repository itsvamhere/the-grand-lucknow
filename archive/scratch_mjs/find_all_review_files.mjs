import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';

for (const f of fs.readdirSync(path.join(projectDir, 'scripts'))) {
  if (!f.endsWith('.mjs')) continue;
  const content = fs.readFileSync(path.join(projectDir, 'scripts', f), 'utf8');
  if (content.includes('Jiyeon') || content.includes('Moritz') || content.includes('Review Card') || content.includes('MJoOlQckD')) {
    console.log(`Found review references in scripts/${f}`);
  }
}
