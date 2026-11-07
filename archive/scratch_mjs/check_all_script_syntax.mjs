import fs from 'fs';
import path from 'path';
import vm from 'vm';

const scriptsDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts';
const files = fs.readdirSync(scriptsDir);

console.log(`Checking syntax of ${files.length} scripts in ${scriptsDir}...`);

for (const file of files) {
  if (!file.endsWith('.js') && !file.endsWith('.mjs')) continue;
  const fullPath = path.join(scriptsDir, file);
  const code = fs.readFileSync(fullPath, 'utf8');
  try {
    new vm.Script(code);
  } catch (err) {
    console.error(`SYNTAX ERROR in ${file}: ${err.message}`);
  }
}

console.log('Script syntax check done.');
