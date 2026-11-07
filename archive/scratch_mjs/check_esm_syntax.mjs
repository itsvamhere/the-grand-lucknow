import fs from 'fs';
import path from 'path';
import vm from 'vm';

const scriptsDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts';
const files = fs.readdirSync(scriptsDir);

for (const file of files) {
  if (!file.endsWith('.js') && !file.endsWith('.mjs')) continue;
  const fullPath = path.join(scriptsDir, file);
  const code = fs.readFileSync(fullPath, 'utf8');
  try {
    new vm.SourceTextModule(code, { initializeImportMeta() {} });
  } catch (err) {
    console.error(`SYNTAX ERROR in ${file}: ${err.message}`);
  }
}

console.log('ES module syntax check complete.');
